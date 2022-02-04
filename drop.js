const newPageDate=0//drop new page date from nodejs
let outOfDate = ( document.cookie.split("loadedoncebefore=")[1].split("; ")[0] < newPageDate )
let ldBefore = document.cookie.contains("loadedoncebefore=")
if (ldBefore && !outOfDate){
    localStorage.getItem("lastname");
} else {
    document.cookie = "loadedoncebefore="+Date.now()+"; ";
    localStorage.setItem("lastname", "Smith");
}