import React from "react";

export function ImageError(e: React.SyntheticEvent<HTMLImageElement>) {
    const target = e.target as HTMLImageElement; // обозначили для ТС что таргет это Image

    // Если же мы не смогли достучаться и до none.jpg, то отменяем привычное поведение у картинки (перестает загружать фото)
    if (target.src.includes("none.jpg") ){
        e.preventDefault();
        target.alt = "Изображение не найдено";
        return
    }
    target.src = "./images/none.jpg"
}