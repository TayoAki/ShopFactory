import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validateAttribution,campaignMetadata,captureCampaign} from './campaign-attribution';
const now=Date.now();const at=new Date(now).toISOString();
test('campaigns persist first/last touches with only permitted tags',()=>{
 const value=validateAttribution({first:{at,utm_source:'golf-club',email:'private@example.com'},last:{at,utm_source:'newsletter',utm_medium:'email',utm_campaign:'fit-guide',session_id:'private'}});
 assert.ok(value);assert.deepEqual(campaignMetadata(value),{bb_attribution:'campaign',bb_source:'newsletter',bb_medium:'email',bb_campaign:'fit-guide'});assert.ok(!JSON.stringify(value).includes('private'));
});
test('privacy signals, expired, future and invalid inputs become explicit unknown',()=>{
 const good={first:{at,utm_source:'club'},last:{at,utm_source:'club'}};
 assert.equal(validateAttribution(good,true),null);
 for(const time of [now-25*3600000,now+120000])assert.equal(validateAttribution({first:{at:new Date(time).toISOString(),utm_source:'club'},last:{at:new Date(time).toISOString(),utm_source:'club'}},false,now),null);
 assert.equal(validateAttribution({first:{at,utm_source:'person@example.com'},last:{at,utm_source:'https://evil.invalid/?token=x'}}),null);
 assert.equal(campaignMetadata(null).bb_attribution,'unknown');assert.equal(captureCampaign(),null);
});
