import AbstractSmartComponent from "./abstract-smart-component.js";
import moment from "moment";

const createCommentMarkup = (comment) => {
  const authorName = comment.author;
  const emotion = comment.emotion;
  const commentText = comment.comment;
  const date = moment(comment.date).fromNow();
  const id = comment.id;

  return (
    `<li class="film-details__comment" data-id="${id}">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${commentText}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${authorName}</span>
          <span class="film-details__comment-day">${date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export const createCommentsTemplate = (comments, commentEmoji) => {
  const commentsTemplate = comments.map((it) => createCommentMarkup(it)).join(`\n`);
  const emojiMarkup = commentEmoji ? `<img src="./images/emoji/${commentEmoji}.png" alt="${commentEmoji}" width="55" height="55">` : ` `;
  return (
    `<section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            ${commentsTemplate}

            <div class="film-details__new-comment">
                <div for="add-emoji" class="film-details__add-emoji-label">
                <input type="hidden" name="add-emoji" value="${commentEmoji}">
                ${emojiMarkup}
                </div>
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>`
  );
};

export default class CommentsComponent extends AbstractSmartComponent {
  constructor(comments) {
    super();

    this._comments = comments;
  }

  getTemplate() {
    return createCommentsTemplate(this._comments);
  }

  setDelelteClick(onClick) {
    this.getElement().querySelectorAll(`.film-details__comment-delete`)
      .forEach((delButton) => {
        delButton.addEventListener(`click`, (evt) => {
          evt.preventDefault();
          const commentId = evt.target.closest(`li`).dataset.id;
          onClick(commentId);
        });
      });

    this._onCommentDeleteClick = onClick;
  }

  recoveryListeners() {
    this.setDelelteClick(this._onCommentDeleteClick);
  }


}
