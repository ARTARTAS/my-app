import React from "react";
import PreloaderIMG from "../../../Assets/CircleLoading.svg";
import s from "./Preloader.module.css"

const Preloader = () => {
    return (
        <img className={s.preloader} src={PreloaderIMG} />
    )
}

export default Preloader;