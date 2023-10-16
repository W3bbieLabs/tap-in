

export const get_room_code = () => {
    return window.location.href.split("=")[1]
}