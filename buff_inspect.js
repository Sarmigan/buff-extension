function addButton(el){
    var b = document.createElement('a')
    b.className = "ctag btn_copy_link"
    b.innerHTML = "Copy inspect"
    b.setAttribute("data-assetid", el.getAttribute("data-assetid"));

    b.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();

        const t = e.target.getAttribute("data-assetid");
        sendRequest("/api/market/cs2_inspect", {
          data: {
            assetid: t
          },
          method: "GET",
          dataType: "json",
          showLoading: true,
          success: function(e) {
            if (e.code != "OK") {
              Buff.toast(e.error);
              return
            }
            navigator.clipboard.writeText(e.data)
          }
        })
    })

    el.before(b)
}

const observer = new MutationObserver((mutationList, mutationObserver) => {
    const buttons = document.getElementsByClassName("ctag ctag btn_3d")

    for(let i=0; i<buttons.length; i++){
        if(buttons[i].parentNode.querySelector(".ctag.btn_copy_link") === null){
            addButton(buttons[i])
        }
    }
});

observer.observe(document.body, { attributes: false, childList: true, subtree: true });