import { localAxios } from "@/util/http-commons";
const local = localAxios();
function listArticle(success, fail){
    local.get(`/board/list`).then(success).catch(fail);
}

function detailArticle(param, success, fail){
    local.get(`/board/${param}`).then(success).catch(fail);
}
function registArticle(article, success, fail){
    local.post(`/board/write`, JSON.stringify(article)).then(success).catch(fail)
}
function uploadImage(img, success, fail){
    
    local.post(`/image/upload`, img,{
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    }
    ).then(success).catch(fail)
}

function printImage(filename, success, fail) {
    local.get(`image/print?filename=${filename}`,{
        headers: {
            'Content-Type': 'text/plain'
          },
    }).then(success).catch(fail);
  }
function userLikedPost(postId, userId, success, fail) {
    local.get(`/board/liked/${postId}`, { params: { userId } }).then(success).catch(fail);
}
function likePost(postId, userId, success, fail) {
    local.post(`/board/like/add`, { boardId: postId, userId: userId }).then(success).catch(fail);
}

function unlikePost(postId, userId, success, fail) {
    local.post(`/board/like/delete`, { boardId: postId, userId: userId }).then(success).catch(fail);
}
function postComment(comment, success, fail) {
    local.post(`/comment/post`, comment).then(success).catch(fail);
}
function getCommentList(boardId, success, fail){
    local.get(`/comment/list/${boardId}`).then(success).catch(fail);
}
export {
    listArticle,
    detailArticle,
    registArticle,
    uploadImage,
    printImage,
    userLikedPost,
    likePost,
    unlikePost,
    postComment,
    getCommentList
}