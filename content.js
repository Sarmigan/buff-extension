var s = document.createElement('script')
s.src = browser.runtime.getURL('buff_inspect.js')
s.id = "copy_inspect_link_script"
document.head.appendChild(s)