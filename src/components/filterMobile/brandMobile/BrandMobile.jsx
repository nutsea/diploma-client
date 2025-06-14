import React, { useEffect, useState } from "react";
import './BrandMobile.scss'

import arr from '../../../assets/arr8.svg'
import { BrandFilter } from "../../filters/brandFilter/BrandFilter";

export const BrandMobile = ({ onClose, onSelectBrand, onSelectModel, brandsPreset, modelsPreset, onDrop, category, brandLink, modelLink }) => {
    const [checkedBrands, setCheckedBrands] = useState([])
    const [checkedModels, setCheckedModels] = useState([])

    const handleFilterClose = () => {
        onClose()
    }

    const handleDropFilter = () => {
        setCheckedBrands([])
        setCheckedModels([])
        onClose()
        onDrop()
    }

    const handleSelectBrand = (value) => {
        setCheckedBrands([value])
        setCheckedModels([])
    }

    const handleUnselectBrand = (value) => {
        setCheckedBrands(checkedBrands.filter(item => item.brand !== value.brand))
    }

    const handleSelectModel = (value) => {
        setCheckedModels([...checkedModels.filter(item => item.brand === value.brand), value])
    }

    const handleUnselectModel = (value) => {
        if (value.model)
            setCheckedModels(checkedModels.filter(item => item.model !== value.model))
        else
            setCheckedModels(checkedModels.filter(item => item.model !== value))
    }

    const handleSubmitFilter = () => {
        onSelectBrand(checkedBrands)
        onSelectModel(checkedModels)
        onClose()
    }

    useEffect(() => {
        if (brandsPreset)
            setCheckedBrands(brandsPreset)
        if (modelsPreset)
            setCheckedModels(modelsPreset)
    }, [brandsPreset, modelsPreset])

    useEffect(() => {
        if (brandLink && !modelLink) {
            setCheckedBrands([brandLink])
        }
        if (brandLink && modelLink) {
            setCheckedBrands([brandLink])
            setCheckedModels([{ model: modelLink, brand: brandLink }])
        }
        // eslint-disable-next-line
    }, [brandLink, modelLink])

    return (
        <>
            <div className="FilterContainer FilterContainerShort">
                <div className="FilterHeight">
                    <div className="FilterTop">
                        <div className="FilterClose" onClick={handleFilterClose}>
                            <img src={arr} alt="Стрелка" />
                        </div>
                        <span>Бренд</span>
                        <span></span>
                    </div>
                    <BrandFilter
                        category={category}
                        onSelectBrand={handleSelectBrand}
                        onSelectModel={handleSelectModel}
                        onUnselectBrand={handleUnselectBrand}
                        onUnselectModel={handleUnselectModel}
                        brandsPreset={brandsPreset}
                        modelsPreset={modelsPreset}
                        mobile
                        brandLink={brandLink}
                        modelLink={modelLink}
                    />
                </div>
            </div>
            <div className="SortSave SortFilter">
                <div className="SortDrop" onClick={handleDropFilter}>Сбросить</div>
                <div className="SortAdd" onClick={handleSubmitFilter}>Применить</div>
            </div>
        </>
    )
}