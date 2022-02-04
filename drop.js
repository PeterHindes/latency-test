// Cookies are sent to node which determines if we send whole page
document.cookie = "loadedoncebefore="+Date.now()+"; ";
const loadFromStorage
// const newPageDate=0//drop new page date from nodejs
// let outOfDate = ( document.cookie.split("loadedoncebefore=")[1].split("; ")[0] < newPageDate )
// let ldBefore = document.cookie.contains("loadedoncebefore=")
if (loadFromLocal){
    html = localStorage.getItem("html");
} else {
    localStorage.setItem("lastname", "Smith");
}