import React, { useEffect, useState } from "react";
import './BrandFilter.scss';
import { fetchBrandsAndModels } from "../../../http/itemAPI";

import checkImg from '../imgs/check.svg'

export const BrandFilter = ({ category, onSelectBrand, onSelectModel, onUnselectBrand, onUnselectModel, subtitle, brandsPreset, modelsPreset, mobile, brandLink, modelLink }) => {
    const [brands, setBrands] = useState([])
    const [checkedBrands, setCheckedBrands] = useState([])
    const [checkedModels, setCheckedModels] = useState([])

    const getBrands = async () => {
        await fetchBrandsAndModels(category).then(data => setBrands(data))
    }

    const sortedBrands = brands && [...brands].sort((a, b) => a.brand.localeCompare(b.brand))

    const sortedModels = (models) => {
        return models.sort((a, b) => a.model.localeCompare(b.model))
    }

    const noWhitespace = (str) => {
        return str?.replace(/[^a-zA-Z0-9]/g, '')
    }

    const clickBrand = (brand) => {
        !onUnselectBrand && onSelectBrand(brand)
        if (checkedBrands.includes(brand.brand)) {
            onUnselectBrand && onUnselectBrand(brand)
            setCheckedBrands(checkedBrands.filter(item => item !== brand.brand))
            for (let i of checkedModels) {
                onUnselectModel && onUnselectModel(i)
            }
            mobile && setCheckedModels([])
            !mobile && setCheckedModels(checkedModels.filter(item => !brand.models.some(model => model === item)))
            !mobile && document.getElementById(`models${noWhitespace(brand.item_uid)}`).removeAttribute('style')
        } else {
            onSelectBrand(brand)
            for (let i of brands) {
                if (!mobile) {
                    document.getElementById(`models${noWhitespace(i.item_uid)}`).removeAttribute('style')
                }
            }
            setCheckedBrands([brand.brand])
            setCheckedModels([])
            if (!mobile) {
                const models = document.querySelectorAll(`#model${noWhitespace(brand.item_uid)}`)
                let height = 0
                for (let i of models) {
                    height += i.clientHeight + 18
                }
                // console.log(brands)
                document.getElementById(`models${noWhitespace(brand.item_uid)}`).setAttribute('style', `height: ${height}px; opacity: 1;`)
            }
        }
    }

    const clickModel = (model) => {
        !onUnselectModel && onSelectModel(model)
        if (checkedModels.find(item => item.model === model.model)) {
            onUnselectModel && onUnselectModel(model)
            mobile && setCheckedModels(checkedModels.filter(item => item.model !== model.model && item !== model.model))
            !mobile && setCheckedModels(checkedModels.filter(item => item !== model))
        } else {
            const brand = brands.find(item => item.brand === model.brand)
            if (!checkedBrands.includes(brand.brand)) {
                onSelectBrand(brand)
                setCheckedBrands([brand.brand])
            }
            onSelectModel(model)
            let newModels = checkedModels.filter(item => item.brand === model.brand)
            newModels.push(model)
            setCheckedModels(newModels)
        }
    }

    useEffect(() => {
        getBrands()
        // eslint-disable-next-line
    }, [category])

    useEffect(() => {
        if (brandsPreset)
            setCheckedBrands(brandsPreset.map(item => item.brand))
        if (modelsPreset)
            setCheckedModels(modelsPreset)
    }, [brandsPreset, modelsPreset])

    useEffect(() => {
        if (brandLink && !modelLink) {
            setCheckedBrands([brandLink])
            if (!mobile) {
                for (let i of brands) {
                    if (!mobile && i.brand !== brandLink) {
                        document.getElementById(`models${noWhitespace(i.item_uid)}`).removeAttribute('style')
                    } else {
                        const models = document.querySelectorAll(`#model${noWhitespace(i.item_uid)}`)
                        let height = 0
                        for (let i of models) {
                            height += i.clientHeight + 18
                        }
                        document.getElementById(`models${noWhitespace(i.item_uid)}`).setAttribute('style', `height: ${height}px; opacity: 1;`)
                    }
                }
            }
        }
        if (brandLink && modelLink) {
            setCheckedBrands([brandLink])
            setCheckedModels([{ model: modelLink, brand: brandLink }])
            if (!mobile) {
                for (let i of brands) {
                    if (!mobile && i.brand !== brandLink) {
                        document.getElementById(`models${noWhitespace(i.item_uid)}`).removeAttribute('style')
                    } else {
                        const models = document.querySelectorAll(`#model${noWhitespace(i.item_uid)}`)
                        let height = 0
                        for (let i of models) {
                            height += i.clientHeight + 18
                        }
                        document.getElementById(`models${noWhitespace(i.item_uid)}`).setAttribute('style', `height: ${height}px; opacity: 1;`)
                    }
                }
            }
        }
        // eslint-disable-next-line
    }, [brandLink, modelLink, brands])

    useEffect(() => {
        if (brands && brands.length > 0 && category === 'shoes') {
            !brands.find(item => item.brand === 'Nike') && setBrands(prev => [...prev, { brand: 'Nike', models: [] }])
            !brands.find(item => item.brand === 'Jordan') && setBrands(prev => [...prev, { brand: 'Jordan', models: [] }])
            !brands.find(item => item.brand === 'New Balance') && setBrands(prev => [...prev, { brand: 'New Balance', models: [] }])
            !brands.find(item => item.brand === 'Asics') && setBrands(prev => [...prev, { brand: 'Asics', models: [] }])
            !brands.find(item => item.brand === 'Puma') && setBrands(prev => [...prev, { brand: 'Puma', models: [] }])
            !brands.find(item => item.brand === 'Adidas') && setBrands(prev => [...prev, { brand: 'Adidas', models: [] }])
            !brands.find(item => item.brand === 'Converse') && setBrands(prev => [...prev, { brand: 'Converse', models: [] }])
            !brands.find(item => item.brand === 'Adidas Originals') && setBrands(prev => [...prev, { brand: 'Adidas Originals', models: [] }])
            !brands.find(item => item.brand === 'Reebok') && setBrands(prev => [...prev, { brand: 'Reebok', models: [] }])
            !brands.find(item => item.brand === 'Vans') && setBrands(prev => [...prev, { brand: 'Vans', models: [] }])
        }
    }, [brands, category])

    if ((!brands || brands.length === 0) && mobile) return (
        <>
            <div className="LoaderBox4">
                <span className="Loader2"></span>
            </div>
        </>
    )

    if (!brands || brands.length === 0) return null

    return (
        <div className="BrandFilter">
            {subtitle &&
                <>
                    {category === 'shoes' &&
                        <div className="BFSub">Бренд</div>
                    }
                    {category === 'clothes' &&
                        <div className="BFSub">Категория</div>
                    }
                </>
            }
            <div className="BFBrands">
                {brands && sortedBrands.map((brand, i) => {
                    return (
                        <div key={i} className="BFBrandBox">
                            <div className="BFBrandItem" onClick={() => clickBrand(brand)}>
                                <span className={`BrandCheck ${checkedBrands.includes(brand.brand) ? 'CheckedBrand' : ''}`}>
                                    <img src={checkImg} alt="" />
                                </span>
                                <span>{brand.brand}</span>
                            </div>
                            <div className={`BFModels ${mobile ? 'FullHeight' : ''}`} id={`models${noWhitespace(brand.item_uid)}`}>
                                {brand.models && sortedModels(brand.models).map((model, j) => {
                                    return (
                                        <div key={j} className="BFModelItem" id={`model${noWhitespace(brand.item_uid)}`} onClick={() => clickModel(model)}>
                                            <span className={`BrandCheck ${checkedModels.find(item => item.model === model.model) ? 'CheckedBrand' : ''}`}>
                                                <img src={checkImg} alt="" />
                                            </span>
                                            <span>{model.model}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}