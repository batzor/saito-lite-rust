
module.exports = PostTeaserTemplate = (app, mod, tx) => {

  let cmt = "0 comments";
  if (tx.children == 1) { cmt = "1 comment"; }
  if (tx.children > 1) { cmt = (tx.children+" comments"); }

  let img = tx.img;
  if (img == undefined) { img = '/post/img/post-logo.png'; }
  if (img == "")        { img = '/post/img/post-logo.png'; }

  let ptitle = tx.msg.title;
  if (ptitle.indexOf("\n") > 0) { ptitle = ptitle.substring(0, ptitle.indexOf("\n")); }
  if (ptitle.indexOf("<div>") > 0) { ptitle = ptitle.substring(0, ptitle.indexOf("<div>")); }
  if (ptitle.indexOf("<br") > 0) { ptitle = ptitle.substring(0, ptitle.indexOf("<br")); }
  if (ptitle.length > 80) { ptitle = ptitle.substring(0, 80) + "..."; }


  return `
    <div data-id="${tx.transaction.sig}" id="post-teaser" class="post-teaser">
      <div class="post-teaser-front">
        <div id="post-teaser-thumbnail" class="post-teaser-thumbnail" style=""><img src="${app.keys.returnIdenticon(tx.transaction.from[0].add)}" style="max-height: 50px; max-width: 50px;" /></div>
      </div>
      <div class="post-teaser-back">
        <div  data-id="${tx.transaction.sig}" id="post-teaser-title" class="post-teaser-title">${ptitle}</div>
        <div id="post-teaser-sublinks"  class="post-teaser-sublinks">
	  <div id="post-teaser-posted-by" class="post-teaser-posted-by">posted by </div>
	  <div id="post-teaser-user" class="post-teaser-user">${app.keys.returnUsername(tx.transaction.from[0].add)}</div>
	  <div data-id="${tx.transaction.sig}" id="post-teaser-comments" class="post-teaser-comments">${cmt}</div>
        </div>
      </div>
    </div>

  `;
}

