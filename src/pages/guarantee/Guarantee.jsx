import React from "react";
import { useNavigate } from 'react-router-dom';
import './Guarantee.scss'

import gua1 from './imgs/gua1.png'
import gua2 from './imgs/gua2.png'
import gua3 from './imgs/gua3.jpg'
import gif from './imgs/gif.mp4'

export const Guarantee = () => {
    const navigate = useNavigate()

    const handleNavigate = (e) => {
        navigate(e.target.id)
        window.scrollTo({
            top: 0,
            // behavior: 'smooth'
        })
    }

    return (
        <div className="MainContainer MBInfo">
            <div className="BreadCrumbs">
                <span className="LastCrumb" id="/" onClick={handleNavigate}>Главная</span>
                <span className="SlashCrumb">/</span>
                <span className="NewCrumb">Гарантия оригинальности</span>
            </div>
            <div className="GuaranteeInfo">
                <div className="GuaranteeTop MB42">
                    <div className="GuaranteeTopLeft">
                        <h2>KICKSIE - гарантия оригинальности</h2>
                        <p>
                            Мы гарантируем оригинальность товаров, заказанных через наш сервис,
                            и сейчас расскажем, почему вы можете быть уверены в этом.
                        </p>
                        <p className="GuaranteeMarkedPar">
                            <span className="GMPPoint">●</span>
                            <span className="GMPText">
                                <b>Проверенный поставщик.</b> Для начала стоит сказать, что мы делаем выкуп товаров
                                исключительно через проверенный временем маркетплейс Poizon, который зарекомендовал
                                себя как надежный поставщик оригинальных товаров.
                            </span>
                        </p>
                        <p className="GuaranteeMarkedPar">
                            <span className="GMPPoint">●</span>
                            <span className="GMPText">
                                <b>Контроль на каждом этапе.</b> Мы не доверяем выкуп товаров посредникам, так как
                                считаем этот процесс одним из самых ответственных. Поэтому процесс выкупа мы осуществляем
                                самостоятельно, чтобы гарантировать подлинность каждой покупки.
                            </span>
                        </p>
                        <p className="GuaranteeMarkedPar">
                            <span className="GMPPoint">●</span>
                            <span className="GMPText">
                                <b>Индивидуальный подход.</b> К каждому выкупленному товару мы прикладываем отчёт, который
                                подтверждает, что товар был приобретён именно под ваш индивидуальный запрос.
                            </span>
                        </p>
                        <p className="MB42">
                            За всё время нашей работы с Poizon нам не поступал ни один поддельный товар.
                        </p>
                    </div>
                    <div className="GuaranteeTopRight">
                        <img src={gua1} alt="" />
                    </div>
                </div>
                <p className="MB42">
                    Теперь мы хотим рассказать немного о Poizon, чтобы вы убедились, почему вероятность получить поддельный товар
                    исключена. <b>Poizon (или Dewu)</b> — это китайский маркетплейс, обладающий одной из крупнейших в мире научных
                    баз для аутентификации товаров. Каждый товар, продаваемый через Poizon, проходит от 9 до 20 этапов проверки.
                    Один из этапов проверки, к примеру, — это анализ материала, который сравнивается с образцом оригинального
                    товара, уже имеющимися в базе.
                </p>
                <div className="GuaranteeImg MB42">
                    <img src={gua2} alt="" />
                </div>
                <div className="GuaranteeMid MB42">
                    <div className="GuaranteeMidLeft Mobile42">
                        <div className="GradientText2">
                            <span className="GradientVerticalLine"></span>
                            <p>
                                Чтобы узнать больше о маркетплейсе Poizon,
                                советуем прочитать статью <a href="https://vk.com/@kicksie-poizon" target="_blank" rel="noreferrer">подробней о Poizon</a> (осторожно, много интересного текста)!
                            </p>
                        </div>
                        <p>
                            Если продавец пытается отправить подделку, Poizon принимает строгие меры, навсегда блокируя возможность сотрудничества.
                        </p>
                        <p>
                            После прохождения всех этапов проверки товар пломбируется фирменными бирюзовыми бирками Poizon, упаковывается в
                            фирменную упаковку и сопровождается сертификатом подлинности. В зависимости от типа товара могут использоваться специальные пломбы-наклейки.
                        </p>
                    </div>
                    <div className="GuaranteeMidRight">
                        <img src={gua3} alt="" />
                    </div>
                </div>
                <p className="IsMobile">
                    На бирках, пломбах и сертификате указан уникальный QR-код и номер заказа, который должен сканироваться и совпадать
                    как с отчётом о выкупе, так и между собой.
                </p>
                <div className="GuaranteeBottom MB42 Mobile10">
                    <div className="GuaranteeBottomLeft">
                        <video
                            src={gif}
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </div>
                    <div className="GuaranteeBottomRight">
                        <p className="NotMobile">
                            На бирках, пломбах и сертификате указан уникальный QR-код и номер заказа, который должен сканироваться и совпадать
                            как с отчётом о выкупе, так и между собой.
                        </p>
                        <p>
                            Все элементы, такие как отчёт о выкупе, сертификат, бирюзовые бирки или защитные пломбы-наклейки, являются важными и
                            гарантируют, что ваш заказ действительно поступил с Poizon и прошёл все необходимые проверки.
                        </p>
                        <div className="GradientText2">
                            <span className="GradientVerticalLine2"></span>
                            <p>
                                Более подробно о том, как проверить все элементы подтверждения аутентификации от Poizon,
                                мы рассказываем в <a href="https://vk.com/@kicksie-proverka-tovara-s-poizon" target="_blank" rel="noreferrer">этой</a> статье.
                            </p>
                        </div>
                        <p>
                            Мы надеемся, что эта статья помогла вам лучше разобраться в процессе проверки товаров на оригинальность от Poizon.
                        </p>
                        <p>
                            Заказывая у нас, вы можете быть уверены, что получите только оригинальные товары, исключая возможность подделки.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}