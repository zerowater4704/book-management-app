import React, { useEffect, useState } from "react";
import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from "../../services/commentService";

const CommentList: React.FC<{ bookId: string }> = ({ bookId }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editedComment, setEditedComment] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const decodedToken: any = JSON.parse(atob(token.split(".")[1]));
      setUserId(decodedToken.id);
    }

    const fetchComments = async () => {
      try {
        const data = await getComments(bookId);
        setComments(data);
      } catch (error) {
        console.error("コメントの取得に失敗しました。", error);
      }
    };

    fetchComments();
  }, [bookId]);

  const handelAddComment = async () => {
    try {
      const addedComment = await addComment(bookId, newComment);
      setComments([...comments, addedComment]);
      setNewComment("");
    } catch (error) {
      console.error("コメント追加に失敗しました。", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("コメント削除に失敗しました。", error);
    }
  };

  const handleEditComment = (commentId: string, currentComment: string) => {
    setEditCommentId(commentId); // 編集するコメントのIDをセット
    setEditedComment(currentComment); // 現在のコメント内容をセット
  };

  const handleUpdateComment = async (commentId: string) => {
    try {
      const updated = await updateComment(commentId, editedComment);
      setComments(
        comments.map((comment) =>
          comment._id === commentId
            ? { ...comment, comment: updated.comment }
            : comment
        )
      );
      setEditCommentId(null); // 編集モードを解除
      setEditedComment("");
    } catch (error) {
      console.error("コメントの更新に失敗しました。", error);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">コメント</h3>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment._id} className="bg-gray-100 p-4 rounded-lg shadow">
            {editCommentId === comment._id ? (
              <div>
                {/* 編集モード */}
                <textarea
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => handleUpdateComment(comment._id)}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                  >
                    更新
                  </button>
                  <button
                    onClick={() => setEditCommentId(null)}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* 通常表示モード */}
                <p className="text-sm text-gray-500">
                  投稿者: {comment.user.name}
                </p>
                <p className="text-gray-800">{comment.comment}</p>
                {comment.user._id === userId && (
                  <div className="mt-2 flex space-x-4">
                    <button
                      onClick={() =>
                        handleEditComment(comment._id, comment.comment)
                      }
                      className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                    >
                      削除
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="コメント追加"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
        <button
          onClick={handelAddComment}
          className="mt-4 w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
        >
          コメント追加
        </button>
      </div>
    </div>
  );
};

export default CommentList;
