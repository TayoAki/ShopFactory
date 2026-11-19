# Customer care, orders, and email signup

## Private inbox

Open https://www.bogeybaby.com/customer-care and sign in with the storefront Railway variable `CUSTOMER_CARE_ADMIN_KEY`. Do not publish the key. The admin session lasts eight hours; it can view saved requests, mark them resolved/reopen them, retry pending mail, and export confirmed newsletter subscribers as CSV. The page and export are private and excluded from indexing.

A support form is acknowledged only after its complete message has committed to PostgreSQL. The customer receives a reference. Repeating the same client request does not duplicate the ticket. Support notifications remain queued when the receiving inbox has not been configured; the ticket is still available in customer care.

## Outgoing mail setup

The implemented delivery adapter uses Resend. Set these variables on the Railway storefront:

- `RESEND_API_KEY`: a sending API key.
- `EMAIL_FROM`: an address on a domain verified for sending, such as `Bogey Baby <notifications@bogeybaby.com>` after verification.
- `SUPPORT_NOTIFICATION_EMAIL`: a monitored receiving mailbox for support and return notifications. This does not have to be on bogeybaby.com.

No sending credentials were present when this work began. The domain also had no MX records, so the site no longer directs people to an unverified hello@ address. Configuring a sending domain does not by itself create an inbox. Email delivery must be verified after the owner supplies the provider credentials and receiving mailbox.

Relevant official documentation: https://resend.com/docs/api-reference/emails/send-email and https://resend.com/docs/dashboard/emails/idempotency-keys.

Pending mail is encrypted in PostgreSQL and retried by the existing five-minute fulfillment worker. A provider request carries a stable idempotency key. Sign-in mail expires after 20 minutes; newsletter confirmation and support notifications expire after 24 hours. Support tickets and signup records remain saved even when mail expires. The private inbox offers a manual retry for pending mail. A sent status means the provider accepted the request, not proof of delivery to an inbox.

Keep `CUSTOMER_AUTH_SECRET` stable; it encrypts pending mail and signs unsubscribe links. It is separate from the admin access key and payment/fulfillment credentials.

## Paid-order access

Customers can find an individual paid order using both its full checkout reference (shown on the payment confirmation screen) and billing email. That session is scoped to the one order. Demo and test payments are excluded.

Once outgoing mail is connected, customers may also request a single-use email sign-in link. It expires after 20 minutes and opens the live paid-order history associated with that billing email. Opening the link page does not consume the token; the customer must submit the confirmation button. Sessions use Secure, HttpOnly, SameSite=Lax cookies and expire after seven days. Logout revokes the stored session.

The account area displays saved payment/production state, not a claim of shipment tracking that has not been received from the supplier. Return requests are reviewed by the business; the account screen does not automatically issue refunds.

## Newsletter

The form asks for explicit email consent. Signup requests are saved in the store's own database, then a confirmation email is queued. Only confirmed records become subscribed and appear in the private CSV export. An unsubscribe invalidates outstanding confirmation links and excludes the address from subsequent subscriber exports. Requesting a new signup later requires a new confirmation.

The signup form does not collect or promise SMS. Old log-only signup records are not automatically treated as verified subscriptions. A campaign service can import the confirmed CSV; no marketing campaign is sent automatically by this implementation.

## Verification

`CUSTOMER_TEST_DATABASE_URL` enables the customer integration suite. It only accepts a loopback database named `bogey_customer_test`. `PRINTIFY_TEST_DATABASE_URL` separately enables fulfillment integration tests against the existing isolated fixture database. Never point either test setting at a live database.

Coverage includes persisted messages and retry deduplication; provider failures and concurrent idempotent retry; token purpose/expiry/single use; consent confirmation and unsubscribe; cross-customer/live-mode/order-scope isolation; atomic rate limiting; encrypted-payload tampering; forged origins; oversized/invalid input; and CSV formula protection. Browser checks additionally cover the actual forms, secure cookies, private export, admin resolution, and honest saved/pending feedback.
