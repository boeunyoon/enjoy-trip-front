import { localAxios } from "@/util/http-commons";
const local = localAxios();
async function getUnReadMsgCount(userId, success, fail){
    await local.post(`/message/unread/count/${userId}`).then(success).catch(fail);
}
export{
    getUnReadMsgCount
}