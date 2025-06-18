import React from "react";
import './MainTiles.scss';

import arr3 from '../../assets/arr3.svg';
import checkmark from '../../assets/check2.png';
import sho from './imgs/sho1.png';
import clo from './imgs/clo1.png';
import sho2 from './imgs/sho2.png';
import clo2 from './imgs/clo2.png';
import shoItem from './imgs/shoItem.png';
import cloItem from './imgs/cloItem.png';
import { useNavigate } from "react-router-dom";

export const MainTiles = () => {
    const navigate = useNavigate()

    const handleNavigate = (e) => {
        window.scrollTo({
            top: 0,
        })
        navigate(e.target.id)
    }

    return (
        <div className="MainTilesContainer">
            <div className="TilesTop">
                <div className="TilesTopLeft">
                    <div className="TileCatalogueBtn" id="/guarantee" onClick={handleNavigate}>
                        <span id="/guarantee">Гарантия оригинальности</span>
                        <img className="TileArrBig" id="/guarantee" src={checkmark} alt="Каталог" />
                        <img className="TileArrSmall" id="/guarantee" src={checkmark} alt="Каталог" />
                    </div>
                    <div className="TileShoes" id={process.env.REACT_APP_SHOES_PATH} onClick={handleNavigate}>
                        <div className="TileSub" id={process.env.REACT_APP_SHOES_PATH}>
                            <span id={process.env.REACT_APP_SHOES_PATH}>Обувь</span>
                            <img src={arr3} id={process.env.REACT_APP_SHOES_PATH} alt="Обувь" />
                        </div>
                        <img className="TileImg" id={process.env.REACT_APP_SHOES_PATH} src={sho} alt="Обувь" />
                        <img className="TileImg2" id={process.env.REACT_APP_SHOES_PATH} src={sho2} alt="Обувь" />
                        <img className="ShoTile" id={process.env.REACT_APP_SHOES_PATH} src={shoItem} alt="Обувь" />
                    </div>
                </div>
                <div className="TileClothes" id={process.env.REACT_APP_CLOTHES_PATH} onClick={handleNavigate}>
                    <div className="TileSub" id={process.env.REACT_APP_CLOTHES_PATH}>
                        <span id={process.env.REACT_APP_CLOTHES_PATH}>Одежда</span>
                        <img src={arr3} id={process.env.REACT_APP_CLOTHES_PATH} alt="Одежда" />
                    </div>
                    <img className="TileImg" id={process.env.REACT_APP_CLOTHES_PATH} src={clo} alt="Одежда" />
                    <img className="TileImg2" id={process.env.REACT_APP_CLOTHES_PATH} src={clo2} alt="Одежда" />
                    <img className="CloTile" id={process.env.REACT_APP_CLOTHES_PATH} src={cloItem} alt="Одежда" />
                </div>
            </div>
        </div>
    )
}