const createCommentMarkup = (comment) => {
  const {authorName, emotion, commentText} = comment;
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${commentText}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${authorName}</span>
          <span class="film-details__comment-day">2019/12/31 23:59</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export const createCommentsTemplate = (comments) => {
  const commentsTemplate = comments.map((it) => createCommentMarkup(it)).join(`\n`);
  return (
    `<ul class="film-details__comments-list">
    ${commentsTemplate}
    </ul>`
  );
};
