import React from "react";
import './MainTiles.scss';

import arr3 from '../../assets/arr3.svg';
import checkmark from '../../assets/check2.png';
import sho from './imgs/sho1.png';
import clo from './imgs/clo1.png';
import acc from './imgs/acc1.png';
import cos from './imgs/cos1.png';
import per from './imgs/per1.png';
import sho2 from './imgs/sho2.png';
import clo2 from './imgs/clo2.png';
import acc2 from './imgs/acc2.png';
import cos2 from './imgs/cos2.png';
import per2 from './imgs/per2.png';
import shoItem from './imgs/shoItem.png';
import cloItem from './imgs/cloItem.png';
import accItem from './imgs/accItem.png';
import cosItem from './imgs/cosItem.png';
import perItem from './imgs/perItem.png';
import { useNavigate } from "react-router-dom";

export const MainTiles = () => {
    const navigate = useNavigate()

    const handleNavigate = (e) => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
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
            <div className="TilesBottom">
                <div className="TileAccessories" id={process.env.REACT_APP_ACCESSORIES_PATH} onClick={handleNavigate}>
                    <div className="TileSub" id={process.env.REACT_APP_ACCESSORIES_PATH}>
                        <span id={process.env.REACT_APP_ACCESSORIES_PATH}>Аксессуары</span>
                        <img src={arr3} id={process.env.REACT_APP_ACCESSORIES_PATH} alt="Аксессуары" />
                    </div>
                    <img className="TileImg" id={process.env.REACT_APP_ACCESSORIES_PATH} src={acc} alt="Аксессуары" />
                    <img className="AccTile" id={process.env.REACT_APP_ACCESSORIES_PATH} src={accItem} alt="Аксессуары" />
                </div>
                <div className="TileCosmetics" id={process.env.REACT_APP_COSMETICS_PATH} onClick={handleNavigate}>
                    <div className="TileSub" id={process.env.REACT_APP_COSMETICS_PATH}>
                        <span id={process.env.REACT_APP_COSMETICS_PATH}>Косметика</span>
                        <img src={arr3} id={process.env.REACT_APP_COSMETICS_PATH} alt="Косметика" />
                    </div>
                    <img className="TileImg" id={process.env.REACT_APP_COSMETICS_PATH} src={cos} alt="Косметика" />
                    <img className="TileImg2" id={process.env.REACT_APP_COSMETICS_PATH} src={cos2} alt="Косметика" />
                    <img className="CosTile" id={process.env.REACT_APP_COSMETICS_PATH} src={cosItem} alt="Косметика" />
                </div>
                <div className="TilePerfumery" id={process.env.REACT_APP_PERFUMERY_PATH} onClick={handleNavigate}>
                    <div className="TileSub" id={process.env.REACT_APP_PERFUMERY_PATH}>
                        <span id={process.env.REACT_APP_PERFUMERY_PATH}>Парфюмерия</span>
                        <img src={arr3} id={process.env.REACT_APP_PERFUMERY_PATH} alt="Парфюмерия" />
                    </div>
                    <img className="TileImg" id={process.env.REACT_APP_PERFUMERY_PATH} src={per} alt="Парфюмерия" />
                    <img className="TileImg2" id={process.env.REACT_APP_PERFUMERY_PATH} src={per2} alt="Парфюмерия" />
                    <img className="PerTile" id={process.env.REACT_APP_PERFUMERY_PATH} src={perItem} alt="Парфюмерия" />
                </div>
            </div>
            <div className="TileAccessories2" id={process.env.REACT_APP_ACCESSORIES_PATH} onClick={handleNavigate}>
                <div className="TileSub" id={process.env.REACT_APP_ACCESSORIES_PATH}>
                    <span id={process.env.REACT_APP_ACCESSORIES_PATH}>Аксессуары</span>
                    <img src={arr3} id={process.env.REACT_APP_ACCESSORIES_PATH} alt="Аксессуары" />
                </div>
                <img className="TileImg2" id={process.env.REACT_APP_ACCESSORIES_PATH} src={acc2} alt="Аксессуары" />
                <img className="AccTile" id={process.env.REACT_APP_ACCESSORIES_PATH} src={accItem} alt="Аксессуары" />
            </div>
        </div>
    )
}