import React, { useEffect, useState } from "react";
import './FilterMobile.scss'

import { PriceMobile } from "./priceMobile/PriceMobile";
import { SizeMobile } from "./sizeMobile/SizeMobile";
import { BrandMobile } from "./brandMobile/BrandMobile";

import close from '../../assets/close.svg'
import arr from '../../assets/arr6.svg'
import exclam from '../../assets/exclam.svg'

export const FilterMobile = ({ min, max, sizeGrid, category, onSelectPrice, onSelectGrid, onSelectSize, onSelectBrand, onSelectModel, brandLink, modelLink, brands, brand }) => {
    const [selectedFilter, setSelectedFilter] = useState('')
    const [pricePreset, setPricePreset] = useState()
    const [gridPreset, setGridPreset] = useState()
    const [sizePreset, setSizePreset] = useState()
    const [brandsPreset, setBrandsPreset] = useState([])
    const [modelsPreset, setModelsPreset] = useState([])

    const handleFilterClose = () => {
        document.querySelector('.App')?.classList.remove('Lock')
        const menu = document.querySelector('.FilterContainer')
        menu?.classList.add('FilterHide')
        const menuBox = document.querySelector('.FilterBox')
        menuBox?.classList.add('FilterBoxHide')
        setSelectedFilter('')
        setTimeout(() => {
            document.querySelector('.FilterMobile')?.classList.remove('FilterMobileShow')
            menuBox?.classList.add('None')
        }, 200);
    }

    const clickFilterAway = (e) => {
        if (!e.target.closest('.FilterContainer') && !e.target.closest('.CSMSort')) {
            handleFilterClose()
        }
    }

    const handleSelectFilter = (filter) => {
        setSelectedFilter(filter)
        document.querySelector('.FilterMobile')?.classList.add('FilterMobileShow')
    }

    const handleUnselectFilter = () => {
        document.querySelector('.FilterMobile')?.classList.remove('FilterMobileShow')
        setTimeout(() => {
            setSelectedFilter('')
        }, 300);
    }

    const handleSelectPrice = (price) => {
        setPricePreset(price)
        onSelectPrice(price)
    }

    const handleDropPrice = () => {
        setPricePreset()
        onSelectPrice()
    }

    const handleSelectSize = (size) => {
        setSizePreset(size)
        onSelectSize(size)
    }

    const handleDropSize = () => {
        setSizePreset()
        onSelectSize()
    }

    const handleSelectBrand = (brand) => {
        onSelectBrand(brand)
        setBrandsPreset(brand && brand.map(item => item))
        for (let i of brand) {
            setModelsPreset(modelsPreset.filter(item => !i.models.some(model => model.model === item)))
        }
    }

    const handleSelectModel = (model) => {
        setModelsPreset(model)
        onSelectModel(model)
    }

    const handleDropBrandAndModel = () => {
        setBrandsPreset([])
        setModelsPreset([])
        onSelectBrand([])
        onSelectModel([])
    }

    const handleDropFilters = () => {
        setPricePreset()
        setGridPreset()
        setSizePreset()
        setBrandsPreset([])
        setModelsPreset([])
        onSelectPrice()
        onSelectGrid('EU')
        onSelectSize()
        onSelectBrand([])
        onSelectModel([])
        handleFilterClose()
    }

    const allFiltersCount = () => {
        let count = 0
        if (pricePreset)
            count++
        if (gridPreset)
            count++
        if (sizePreset && sizePreset.length > 0)
            count += sizePreset.length
        if (brandsPreset && brandsPreset.length > 0)
            count += brandsPreset.length
        if (modelsPreset && modelsPreset.length > 0)
            count += modelsPreset.length
        return count > 0 ? `(${count})` : ''
    }

    const brandsCount = () => {
        let count = 0
        if (brandsPreset && brandsPreset.length > 0)
            count += brandsPreset.length
        if (modelsPreset && modelsPreset.length > 0)
            count += modelsPreset.length
        return count > 0 ? `${count}` : ''
    }

    useEffect(() => {
        if (brandLink)
            setBrandsPreset([brandLink])
    }, [brandLink])

    useEffect(() => {
        if (modelLink)
            setModelsPreset([modelLink])
    }, [modelLink])

    return (
        <div className="FilterBox FilterBoxHide None" onClick={clickFilterAway}>
            <div className="FilterContainer FilterHide">
                <div className="FilterHeight">
                    <div className="FilterTop">
                        <div className="FilterClose" onClick={handleFilterClose}>
                            <img src={close} alt="Закрыть" />
                        </div>
                        <span>Фильтр</span>
                        <span></span>
                    </div>
                    <div className="FilterMenu">
                        <div className="FilterMenuItem" onClick={() => handleSelectFilter('price')}>
                            <span className="FilterMenuText">
                                <span>Цена</span>
                                {pricePreset &&
                                    <span className="FilterSetCount">{pricePreset && '1'}</span>
                                }
                            </span>
                            <img src={arr} alt="Стрелка" />
                        </div>
                        {/* <div className="MenuLine"></div>
                        <div className="FilterMenuItem" onClick={() => handleSelectFilter('sizeGrid')}>
                            <span className="FilterMenuText">
                                <span>Размерная сетка</span>
                                {gridPreset &&
                                    <span className="FilterSetCount">{gridPreset && '1'}</span>
                                }
                            </span>
                            <img src={arr} alt="Стрелка" />
                        </div> */}
                        <div className="MenuLine"></div>
                        <div className="FilterMenuItem" onClick={() => handleSelectFilter('brand')}>
                            <span className="FilterMenuText">
                                {category === 'shoes' &&
                                    <span>Бренд</span>
                                }
                                {category === 'clothes' &&
                                    <span>Категория</span>
                                }
                                {brandsCount() &&
                                    <span className="FilterSetCount">{brandsCount()}</span>
                                }
                            </span>
                            <img src={arr} alt="Стрелка" />
                        </div>
                        <div className="MenuLine"></div>
                        <div className={`FilterMenuItem ${brand ? '' : 'Inactive'}`} onClick={() => handleSelectFilter('size')}>
                            <span className="FilterMenuText">
                                <span>Размер {category === 'shoes' && brand ? `(${sizeGrid})` : ''}</span>
                                {sizePreset && sizePreset.length && sizePreset.length > 0 &&
                                    <span className="FilterSetCount">{sizePreset && sizePreset.length && sizePreset.length > 0 && `${sizePreset.length}`}</span>
                                }
                            </span>
                            <img src={arr} alt="Стрелка" />
                        </div>
                        <div className="MenuLine"></div>
                        <div className="FilterMenuNoBrand">
                            <img src={exclam} alt="" />
                            <span>Выберите бренд, чтобы увидеть все доступные размеры.</span>
                        </div>
                    </div>
                </div>
                <div className="SortSave">
                    <div className="SortDrop" onClick={handleDropFilters}>Сбросить {allFiltersCount()}</div>
                    <div className="SortAdd" onClick={handleFilterClose}>Применить</div>
                </div>
                <div className="FilterMobile">
                    {selectedFilter === 'price' &&
                        <PriceMobile
                            category={category}
                            onClose={handleUnselectFilter}
                            min={min}
                            max={max}
                            onSelectPrice={handleSelectPrice}
                            preset={pricePreset}
                            onDrop={handleDropPrice}
                        />
                    }
                    {selectedFilter === 'brand' &&
                        <BrandMobile
                            onClose={handleUnselectFilter}
                            category={category}
                            onSelectBrand={handleSelectBrand}
                            onSelectModel={handleSelectModel}
                            brandsPreset={brandsPreset}
                            modelsPreset={modelsPreset}
                            onDrop={handleDropBrandAndModel}
                            brandLink={brandLink}
                            modelLink={modelLink}
                        />
                    }
                    {selectedFilter === 'size' &&
                        <SizeMobile
                            onClose={handleUnselectFilter}
                            onSelectSize={handleSelectSize}
                            preset={sizePreset}
                            onDrop={handleDropSize}
                            sizeGrid={sizeGrid}
                            brand={brand}
                        />
                    }
                </div>
            </div>
        </div>
    )
}