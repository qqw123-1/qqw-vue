import request from '@/common/plugins/axios';

export function testApi(params = {}, config = {}){
  return request.post('/testApi.do', params, config)
}