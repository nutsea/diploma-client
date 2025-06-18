import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import './Footer.scss'

import logoNew from '../../assets/logoNew.png'
import arr4 from '../../assets/arr4.svg'
import tg from '../../assets/tgFooter.svg'
import { Context } from "../..";
import { observer } from "mobx-react-lite";

export const Footer = observer(() => {
    const { brand_check } = useContext(Context)
    const navigate = useNavigate()

    const handleNavigate = (e) => {
        navigate(e.target.id)
        window.scrollTo({
            top: 0,
        })
    }

    const handleNavigateToBrand = (brands) => {
        brand_check.setBrand(brands)
        navigate('/catalogue/?brandset=true')
        window.scrollTo({
            top: 0,
        })
    }

    return (
        <footer className="Footer">
            <div className="FooterTop">
                <div className="FooterCol">
                    <img className="FooterLogo" src={logoNew} alt="WearPoizon" id="/" onClick={handleNavigate} />
                </div>
                <div className="FooterCol" />
                <div className="FooterCol" />
                <div className="FooterCol FooterAppCol"></div>
            </div>
            <div className="FooterMid">
                <div className="FooterCol MidFooterCol">
                    <h3>Каталог</h3>
                    <span className="FooterLink" id={process.env.REACT_APP_SHOES_PATH} onClick={handleNavigate}>Обувь</span>
                    <span className="FooterLink" id={process.env.REACT_APP_CLOTHES_PATH} onClick={handleNavigate}>Одежда</span>
                </div>
                <div className="FooterCol MidFooterCol">
                    <h3>Сервис</h3>
                    <span className="FooterLink" id="/payment" onClick={handleNavigate}>Оплата и доставка</span>
                    <a className="FooterLink" href="https://t.me/nutsea" target="_blank" rel="noreferrer">Помощь</a>
                    <span className="FooterLink" id="/guarantee" onClick={handleNavigate}>Гарантия оригинальности</span>
                    <span className="FooterLink">Как выбрать размер</span>
                </div>
                <div className="FooterCol MidFooterCol">
                    <h3>Бренды</h3>
                    <span className="FooterLink" onClick={() => handleNavigateToBrand('Nike')}>Nike</span>
                    <span className="FooterLink" onClick={() => handleNavigateToBrand('Jordan')}>Jordan</span>
                    <span className="FooterLink" onClick={() => handleNavigateToBrand('New Balance')}>New Balance</span>
                    <span className="FooterLink" onClick={() => handleNavigateToBrand('Asics')}>Asics</span>
                    <span className="FooterLink" onClick={() => handleNavigateToBrand('Puma')}>Puma</span>
                    <span className="FooterLink" onClick={() => handleNavigateToBrand('Adidas')}>Adidas</span>
                    <span className="FooterLink" onClick={() => handleNavigateToBrand('Converse')}>Converse</span>
                    <span className="FooterLink AllBrands" id="/catalogue" onClick={handleNavigate}>
                        <span id="/catalogue">Все бренды</span>
                        <img id="/catalogue" src={arr4} alt="Все бренды" />
                    </span>
                </div>
                <div className="FooterCol MidFooterCol">
                    <h3>О нас</h3>
                    <span className="FooterAppsLinks">
                        <a href="https://t.me/nutsea" target="_blank" rel="noreferrer">
                            <img src={tg} alt="" />
                        </a>
                    </span>
                </div>
            </div>
            <div className="FooterBottom">
                <div className="FooterLeft">© CLOSETRUN. Все права защищены.</div>
            </div>
        </footer>
    )
})