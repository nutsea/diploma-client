import React from "react"
import './Refund.scss'

import refund_img from '../../assets/refund.png'

export const Refund = () => {
    return (
        <div className="MainContainer RefundContainer MBInfo">
            <h3>Правила совершения платежей и возврата оплаты</h3>
            <p>Настоящие Правила устанавливают правила совершения платежных операций на Платформе, и возврата оплаты. Правила являются приложением к Соглашению.</p>

            <br />
            <h4>1. Основные и новые термины и определения</h4>
            <p>1.1. Банк - банковская или иная финансовая организация.</p>
            <p>1.2. Банк-эмитент – кредитная организация, которая осуществила эмиссию Карты.</p>
            <p>1.3. Закрытие Сделки – принятие Покупателем услуг Агента, как это предусмотрено Соглашением и приложениями к нему.</p>
            <p>1.4. Карта – банковская карта, эмитированная Банком или Банком-эмитентом.</p>
            <p>1.5. Компания – ИП Гончаров Владислав Викторович, ИНН: 940901826603, ОГРНИП: 323940100258821, email: info@kicksie.ru</p>
            <p>1.6. ПС – международные платежные системы Visa International или MasterCard Worldwide, а также Национальная система платежных карт «МИР».</p>
            <p>1.7. Политика обработки персональных данных и файлов Cookie – приложение к Соглашению, регулирующее порядок обработки Компанией персональных данных Пользователей, размещенное в сети Интернет по URL-ссылке: https://www.kicksie.ru/privacy-policy</p>
            <p>1.8. Платформа – принадлежащий Оператору программно-аппаратный комплекс «kicksie» по адресу: www.kicksie.ru, функциональное назначение которого заключается в возможности для Пользователей, прошедших Регистрацию в качестве Покупателей, заключать Агентские договоры с Агентом, направляя Поручение.</p>
            <p>1.9. Платежные сервисы – совокупность программных и аппаратных средств, предоставляемых Компанией, обеспечивающих информационное и технологическое взаимодействие между Пользователем и Компанией и/или другими Пользователями при совершении платежей с использованием сети Интернет, предоставляемых, в том числе, путем привлечения банковских и иных финансовых организаций. Порядок совершения платежей осуществляется в соответствии с настоящими Правилами и/или правилами таких привлеченных банковских и иных финансовых организаций. Список Платежных сервисов указывается на Платформе.</p>
            <p>1.10. Платежная операция – совокупное упоминание следующих операций с использованием доступных Платежных сервисов: Совершение Пользователем платежа в пользу Компании.</p>
            <p>1.11. Соглашение – Пользовательское соглашение, оферта, договор на условиях которой считается заключенным между Компанией и Пользователем после выражения Пользователем акцепта Соглашения, который регулирует условия использования Платформы, размещенный по адресу в сети Интернет: https://www.kicksie.ru/user-agreement</p>
            <p>1.12. Сделка – правоотношения между Покупателем и Агентом, складывающиеся в рамках Агентского договора, заключенного через Платформу.</p>
            <p>1.13. Сумма списания – общая сумма денежных средств переводимая с Карты Покупателя в адрес Агента и Компании, выраженная исключительно в рублях Российской Федерации.</p>
            <p>1.14. Термины, которые употребляются в настоящем документе, но которым не было дано определение, понимаются в значении, которое придается им Соглашением, далее - приложениями к нему, а в последнюю очередь - в значении, которое придается им в сети Интернет.</p>

            <br />
            <h4>2. Предмет правил</h4>
            <p>2.1. Настоящие Правила регулируют способы, порядок и условия предоставления Пользователям Платежных сервисов для совершения Платежных операций на Платформе.</p>
            <p>2.2. Если иное не предусмотрено Соглашением или имеющимся на Платформе функционалом, Пользователь при совершении Платежной операции может использовать любой доступный Платежный сервис, использование которого предусмотрено Компанией. При безналичном перечислении денежных средств, датой оплаты считается дата зачисления денежных средств на расчетный счет Компании.</p>
            <p>2.3. Поскольку Правила являются приложением к Соглашению, во всем остальном, что не предусмотрено Правилами, Стороны руководствуются положениями Соглашения.</p>
            <p>2.4. Компания вправе вносить в Правила изменения, которые вступают в силу с момента публикации на Платформе, и не требуют какого-либо предварительного уведомления (одобрения, согласия) Пользователей. Правила в новой редакции действует как для новых Пользователей, так и для Пользователей, принявших условия Правил до внесения изменений.</p>

            <br />
            <h4>3. Платеж в пользу компании</h4>
            <p>3.1. Совершение Платежной операции Пользователем в пользу Компании может быть осуществлено в качестве встречного предоставления со стороны Пользователя за оказание услуг Компанией, предусмотренных Соглашением или приложениями к нему.</p>
            <p>3.2. Указанное в настоящем разделе вознаграждение Компании уплачивается Пользователем в порядке 100% (Стопроцентной) предварительной оплаты, с использованием Платежного сервиса, либо путем оплаты Компании по выставленному счету / предоставленным реквизитам для оплаты.</p>
            <p>3.3. Размер Платежной операции предусматривается положениями Соглашения, либо указываться непосредственно на Платформе.</p>

            <br />
            <h4>4. Условия использования банковских карт</h4>
            <p>4.1. К оплате принимаются карты VISA, MasterCard, МИР;</p>
            <p>4.2. На странице для ввода данных банковской карты потребуется ввести: номер банковской карты, имя владельца карты, срок действия карты, трехзначный код безопасности (CVV2 для Visa, CVC2 для MasterCard, Код Дополнительной Идентификации для МИР). Все необходимые данные находятся на самой карте, CCV код безопасности — это три цифры, которые размещены на обратной стороне карты. После чего вы будете направлены на страницу Вашего банка для введения кода безопасности, который вы получите в СМС. Если код не придёт, вам следует обратиться в банк, в котором происходила выдача карты.</p>
            <img src={refund_img} alt="" />
            <p>4.3. Операции по банковским картам совершаются только держателем карты.</p>
            <p>4.4. Авторизация операций по банковским картам осуществляется банком. Если у банка есть основания полагать, что операция носит мошеннический характер, то банк вправе отказать в осуществлении данной операции. Мошеннические операции с банковскими картами являются уголовным преступлением.</p>
            <p>4.5. Во избежание случаев мошенничества платежи, осуществленные с помощью банковской карты, могут проверяться Компанией в рамках имеющихся возможностей. Пользователь-держатель карты, оформивший такой платеж, обязан по запросу, поступившему от Компании, предоставить копию необходимых Компании документов для подтверждения правомерного использования банковской карты. В случае непредставления запрошенных документов Пользователем в течение 3 (Трех) календарных дней от даты оформления платежа или наличия сомнений в их подлинности, Компания вправе приостановить Пользователю доступ к использованию Платформы полностью или частично.</p>
            <p>4.6. Пользователь самостоятельно и за свой счет несет все расходы, связанные с перечислением денежных средств Компании и другим Пользователям, включая различные сборы и комиссии банков и операторов платежных систем. Размер таких сборов и комиссий определяется исключительно соответствующими банками и операторами платежных систем. При этом Пользователь-плательщик понимает и соглашается с тем, что при совершении покупок может взиматься дополнительные комиссии третьим лицам, обеспечивающим осуществление Платежных операций. Размер комиссии, а также условия перечисления денежных средств по каждому способу оплаты указываются в интерфейсе платежной системы лица, обеспечивающего осуществление платежей. Компания не несет ответственности за действия лица, обеспечивающего осуществление платежей.</p>
            <p>4.7. При оплате банковской картой, обработка платежа (включая ввод номера карты) происходит на защищенной странице процессинговой системы, которая прошла международную сертификацию. Это значит, что конфиденциальные данные Пользователя (реквизиты карты, регистрационные данные и др.) не поступают Компании, их обработка полностью защищена и никто, в том числе Компания (через Платформу или иным образом), не может получить персональные и банковские данные Пользователя. При работе с карточными данными применяется стандарт защиты информации, разработанный международными платёжными системами Visa и Masterсard-Payment Card Industry Data Security Standard (PCI DSS), что обеспечивает безопасную обработку реквизитов Банковской карты держателя. Применяемая технология передачи данных гарантирует безопасность по сделкам с Банковскими картами путем использования протоколов Secure Sockets Layer (SSL), Verifiedby Visa, Secure Code,и закрытых банковских сетей, имеющих высшую степень защиты.</p>
            <p>4.8. Пользователи соглашаются с тем, что при запросе возврата денежных средств в случае отказа от покупки, возврат производится исключительно на ту же банковскую карту, с которой была произведена оплата, если возврат денежных средств предусмотрен Пользовательским соглашением и приложениями к нему. Сроки возврата платежей указываются в соответствующей оферте, либо непосредственно на Платформе.</p>

            <br />
            <h4>5. Заключительные положения</h4>
            <p>5.1. Во всем остальном, что не урегулировано положениями настоящих Правил, Стороны руководствуются положениями Соглашения и приложениями к нему, а также законодательством РФ.</p>
            <p>5.2. Признание любого положения настоящих Правил недействительным либо неисполнимым и его аннулирование не должно затрагивать остальных его положений, и такое недействительное/неисполнимое положение подлежит замене действительным/исполнимым и юридически значимым положением, максимально приближенным по своему экономическому содержанию, смыслу и эффекту к первоначальной редакции Правил.</p>
            <p>5.3. Компанией могут быть реализованы иные способы совершения Платежных операций, порядок совершения которых будет регулироваться документом, размещенным на Платформе. При использовании такого средства совершения Платежных операций, Пользователь до совершения Платежной операции обязуется ознакомиться с соответствующими документами, регулирующими порядок совершения такой операции, и совершать Платежную операцию только после принятия их условия в полном объеме.</p>
            <p>5.4. В целях дополнительной идентификации Пользователя, Компания оставляет за собой право запросить у Пользователя предоставления дополнительных сведений.</p>
            <p>5.5. Продолжая использование Платформы в части совершения Платежных операций с использованием любых Платежных сервисов, Пользователь этим подтверждает свое согласие с соответствующими пользовательскими соглашениями, иными документами Компании, а также банковских или иных организаций, предоставляющих Платежные сервисы. Пользователь в максимально возможной степени подтверждает свое согласие на осуществление обработки персональных данных по поручению Компании третьими лицами, в том числе, но не ограничиваясь: платежной системой, оператором фискальных данных, а также соглашается на получение электронного чека на телефонный номер или адрес электронной почты Пользователя.</p>
        </div>
    )
}