import React, { useEffect, useRef, useState } from "react";
import "./SizeFilter.scss";
import { fetchSizes } from "../../../http/sizeAPI";
import { fetchBrandsAndModels } from "../../../http/itemAPI";

import { v4 } from 'uuid'
import checkImg from '../imgs/check.svg'
import exclam from '../imgs/exclam.svg'

export const SizeFilter = ({ brand, sizeGrid, category, onSelectSize, subtitle, preset }) => {
    const [brands, setBrands] = useState([])
    const [sizes, setSizes] = useState()
    const [checkedSizes, setCheckedSizes] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchId = useRef(null)

    const getSizes = async () => {
        setLoading(true)
        const uid = v4()
        fetchId.current = uid
        if (brand) await fetchSizes(brand, sizeGrid, category).then(data => {
            if (uid === fetchId.current) {
                setSizes(data)
                setLoading(false)
            }
        })
    }

    function isValidSize(size) {
        return /^(\d+(\.\d+)?(\/\d+)?(\s\d\/\d)?)$/.test(size)
    }

    function convertSizeToNumeric(size) {
        size = size.replace(' 1/3', '.33').replace(' 2/3', '.67').replace(' 1/2', '.5').replace(' 1/4', '.25').replace(' 3/4', '.75')
        return parseFloat(size)
    }

    function replaceSize(size) {
        return size.replace(' 1/2', '½').replace(' 2/3', '⅔').replace(' 1/3', '⅓').replace(' 1/4', '¼').replace(' 3/4', '¾')
    }

    function sortItemsBySize(items) {
        const sizeOrder = ["xxxxs", "xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl", "xxxxl", "xxxxxl"]

        function getNumericValue(size) {
            return convertSizeToNumeric(size)
        }

        function getSizeOrder(size) {
            return sizeOrder.indexOf(size.toLowerCase())
        }

        function isInSizeOrder(size) {
            return sizeOrder.includes(size.toLowerCase())
        }

        let numericItems = items.filter(item => isValidSize(item.size))
        let validLetterItems = items.filter(item => !isValidSize(item.size) && isInSizeOrder(item.size))
        const invalidLetterItems = items.filter(item => !isValidSize(item.size) && !isInSizeOrder(item.size))

        numericItems = numericItems.sort((a, b) => getNumericValue(a.size) - getNumericValue(b.size))

        validLetterItems = validLetterItems.sort((a, b) => getSizeOrder(a.size) - getSizeOrder(b.size))

        return numericItems.concat(validLetterItems).concat(invalidLetterItems)
    }

    const clickSize = (size) => {
        onSelectSize(size)
        if (checkedSizes.includes(size)) {
            setCheckedSizes(checkedSizes.filter(item => item !== size))
        } else {
            setCheckedSizes([...checkedSizes, size])
        }
    }

    const getBrands = async () => {
        await fetchBrandsAndModels(category).then(data => setBrands(data))
    }

    useEffect(() => {
        getSizes()
        setCheckedSizes([])
        getBrands()
        // eslint-disable-next-line
    }, [sizeGrid, category, brand])

    useEffect(() => {
        if (preset)
            setCheckedSizes(preset)
    }, [preset])

    if (category === 'cosmetics' || category === 'perfumery') return null

    if (brand && (!brands || brands.length === 0)) return (
        <>
            <div className="LoaderBox4">
                <span className="Loader2"></span>
            </div>
        </>
    )

    if (!brands || brands.length === 0) return null

    return (
        <div className="SizeFilter">
            {subtitle &&
                <>
                    <div className="SFSub">Размер {category === 'shoes' && brand ? `(${sizeGrid})` : ''}</div>
                    {!brand &&
                        <div className="SFNoBrand">
                            <img src={exclam} alt="" />
                            <span>Выберите бренд, чтобы увидеть все доступные размеры.</span>
                        </div>
                    }
                </>
            }
            {brand && sizes && sizes.length === 0 && !loading &&
                <div className="SFNoBrand">
                    <span>Размеры не найдены</span>
                </div>
            }
            {brand &&
                <div className="SFGrid">
                    {sizes && sortItemsBySize(sizes).map((size, i) => {
                        return (
                            <div key={i} className="SFSizeItem" onClick={() => clickSize(size.size)}>
                                <span className={`SizeCheck ${checkedSizes.includes(size.size) ? 'CheckedSize' : ''}`}>
                                    <img src={checkImg} alt="" />
                                </span>
                                <span>{replaceSize(size.size)}</span>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}