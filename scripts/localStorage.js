// JAIME FERNÁNDEZ CALVO
// https://github.com/jaimecamocha/tareaT4DWECDIW_gestorInventarioPOO.git


//función para guardar en el localstorage
export function saveLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

//función para cargar los datos guardados en el localstorage
export function loadFromLocalStorage(key) {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : null;
}
