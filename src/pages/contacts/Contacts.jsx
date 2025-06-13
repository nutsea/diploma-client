import React from "react";
import { useNavigate } from 'react-router-dom';
import './Contacts.scss'

import mainContactVK from '../../assets/mainContactVK.svg'
import mainContactTG from '../../assets/mainContactTG.svg'
import contactTG from '../../assets/contactTG.svg'

export const Contacts = () => {
    const navigate = useNavigate()

    const handleNavigate = (e) => {
        navigate(e.target.id)
        window.scrollTo({
            top: 0,
        })
    }

    const handleNavigate2 = (url) => {
        setTimeout(() => {
            let newWindow = window.open(url, '_blank')

            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                window.location.href = url
            }
        }, 10)
    }

    return (
        <div className="MainContainer MBInfo">
            <div className="BreadCrumbs">
                <span className="LastCrumb" id="/" onClick={handleNavigate}>Главная</span>
                <span className="SlashCrumb">/</span>
                <span className="NewCrumb">Контакты</span>
            </div>
            <div className="ContactsInfo">
                <h2>Контакты</h2>
                <div className="ContactsTable">
                    <div className="MainContacts">
                        <div className="ContactItem" onClick={() => handleNavigate2('https://vk.com/kicksie')}>
                            <img src={mainContactVK} alt="" />
                            <span className="ContactInfo">
                                <span className="ContactNickname">@kicksie</span>
                                <span className="ContactRes">VK</span>
                            </span>
                        </div>
                        <div className="ContactItem" onClick={() => handleNavigate2('https://t.me/kicksie')}>
                            <img src={mainContactTG} alt="" />
                            <span className="ContactInfo">
                                <span className="ContactNickname">@kicksie</span>
                                <span className="ContactRes">Telegram</span>
                            </span>
                        </div>
                    </div>
                    <div className="AllContacts">
                        <div className="ContactItem2" onClick={() => handleNavigate2('https://t.me/kicksie_bot')}>
                            <img src={contactTG} alt="" />
                            <span className="ContactInfo">
                                <span className="ContactNickname2">@kicksie_bot</span>
                                <span className="ContactRes2">Telegram-Бот</span>
                            </span>
                        </div>
                        <div className="ContactItem2" onClick={() => handleNavigate2('https://vk.com/topic-218074236_48983779')}>
                            <img src={contactTG} alt="" />
                            <span className="ContactInfo">
                                <span className="ContactNickname2">Отзывы</span>
                                <span className="ContactRes2">VK (Отзывы)</span>
                            </span>
                        </div>
                        <div className="ContactItem2" onClick={() => handleNavigate2('https://t.me/kicksie_ord')}>
                            <img src={contactTG} alt="" />
                            <span className="ContactInfo">
                                <span className="ContactNickname2">@kicksie_ord</span>
                                <span className="ContactRes2">Telegram (Выкупы)</span>
                            </span>
                        </div>
                        <div className="ContactItem2" onClick={() => handleNavigate2('https://t.me/kicksie_ph')}>
                            <img src={contactTG} alt="" />
                            <span className="ContactInfo">
                                <span className="ContactNickname2">@kicksie_ph</span>
                                <span className="ContactRes2">Telegram (Фото-отчеты)</span>
                            </span>
                        </div>
                        <div className="ContactItem2" onClick={() => handleNavigate2('https://t.me/kicksie_manager')}>
                            <img src={contactTG} alt="" />
                            <span className="ContactInfo">
                                <span className="ContactNickname2">@kicksie_manager</span>
                                <span className="ContactRes2">Telegram Менеджера</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}