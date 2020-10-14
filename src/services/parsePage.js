export function parsePage() {
    let result = window.location.href.split('page=')[1];
    if(result) {
        result = result.split('&')[0];
    }
    
    return parseInt(result) || 1;
}