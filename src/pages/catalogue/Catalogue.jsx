import React, { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import './Catalogue.scss'
import queryString from 'query-string';
import { v4 } from 'uuid'
import { observer } from "mobx-react-lite"
import { Context } from "../.."
import { SizeFilter } from "../../components/filters/sizeFilter/SizeFilter"
import { SizeGridFilter } from "../../components/filters/sizeGridFilter/SizeGridFilter"
import { PriceFilter } from "../../components/filters/priceFilter/PriceFilter"
import { fetchMinMaxPrice } from "../../http/sizeAPI"
import { BrandFilter } from "../../components/filters/brandFilter/BrandFilter";
import { fetchItems } from "../../http/itemAPI";

import { Item } from "../../components/item/Item";
import { Pagination } from "../../components/pagination/Pagination";

import arr from '../../assets/arr7.svg'
import sortImg from '../../assets/sort.svg'
import filterImg from '../../assets/filter.svg'
import { SortMobile } from "../../components/sortMobile/SortMobile";
import { FilterMobile } from "../../components/filterMobile/FilterMobile";


// const sortOptions = [
//     { name: 'По умолчанию', value: 'default' },
//     { name: 'Популярные', value: 'popular' },
//     { name: 'По возрастанию цены', value: 'priceUp' },
//     { name: 'По убыванию цены', value: 'priceDown' },
//     { name: 'Сначала новые товары', value: 'new' },
//     { name: 'Сначала старые товары', value: 'old' },
// ]

const sortOptions = [
    { name: 'Популярные', value: 'popular' },
    { name: 'По возрастанию цены', value: 'priceUp' },
    { name: 'По убыванию цены', value: 'priceDown' },
    { name: 'Сначала новые товары', value: 'new' },
    { name: 'Сначала старые товары', value: 'old' },
]

export const Catalogue = observer(() => {
    const navigate = useNavigate()
    let location = useLocation()
    const { brand_check } = useContext(Context)
    const { category, popular, brandset, modelset, search } = queryString.parse(location.search)
    const { items } = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [prices, setPrices] = useState({ min: 0, max: 10000000000 })
    const [sort, setSort] = useState(sortOptions[0])
    const [checkedPrices, setCheckedPrices] = useState([prices.min, prices.max])
    const [grid, setGrid] = useState('EU')
    const [checkedSizes, setCheckedSizes] = useState([])
    const [checkedBrands, setCheckedBrands] = useState([])
    const [checkedModels, setCheckedModels] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [width, setWidth] = useState(window.innerWidth)
    const fetchId = useRef(null)
    const [sizes, setSizes] = useState([])

    const handleNavigate = (e) => {
        navigate(e.target.id)
        window.scrollTo({
            top: 0
        })
    }

    const clickSortList = () => {
        document.querySelector('.CatalogueSortList')?.classList.toggle('HiddenSortList')
        document.querySelector('.SortArrow')?.classList.toggle('SortArrowRotate')
        window.addEventListener('click', (e) => {
            if (!e.target.closest('.CatalogueSortPC')) {
                document.querySelector('.CatalogueSortList')?.classList.add('HiddenSortList')
                document.querySelector('.SortArrow')?.classList.remove('SortArrowRotate')
            }
        })
    }

    const handleSelectGrid = (type) => {
        setGrid(type)
        setCheckedSizes([])
    }

    const handleSelectSize = (size) => {
        if (Array.isArray(size)) {
            setCheckedSizes(size)
        } else {
            if (checkedSizes.includes(size)) {
                setCheckedSizes(checkedSizes.filter(item => item !== size))
            } else {
                setCheckedSizes([...checkedSizes, size])
            }
        }
    }

    const handleSelectPrice = (price) => {
        setCheckedPrices(price)
    }

    const handleSelectBrand = (brand) => {
        brand_check.setBrand('')
        if (Array.isArray(brand)) {
            setCheckedBrands(brand && brand.map(item => item.brand ? item.brand : item))
            for (let i of brand) {
                setCheckedModels(checkedModels.filter(item => !i.models.some(model => model.model === item)))
            }
        } else {
            if (brand && checkedBrands.includes(brand.brand)) {
                setCheckedBrands(checkedBrands.filter(item => item !== brand.brand))
                setCheckedModels(checkedModels.filter(item => !brand.models.some(model => model.model === item)))
            } else {
                if (brand) {
                    setCheckedBrands([brand.brand])
                    setCheckedModels([])
                }
            }
        }
    }

    const handleSelectModel = (model) => {
        brand_check.setBrand('')
        brand_check.setModel('')
        if (Array.isArray(model)) {
            setCheckedModels(model)
        } else {
            if (model && checkedModels.includes(model)) {
                setCheckedModels(checkedModels.filter(item => item !== model))
            } else {
                setCheckedModels([...checkedModels, model])
            }
        }
    }

    const handleSelectPage = (page) => {
        items.setPage(page)
        // window.scrollTo({
        //     top: 0,
        //     behavior: 'smooth'
        // })
    }

    const handleSelectSort = (sort) => {
        setSort(sort)
    }

    const showSort = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        document.querySelector('.App')?.classList.add('Lock')
        const menu = document.querySelector('.SortContainer')
        const menuBox = document.querySelector('.SortBox')
        menuBox?.classList.toggle('None')
        setTimeout(() => {
            menu?.classList.toggle('SortHide')
            menuBox?.classList.toggle('SortBoxHide')
        }, 1);
    }

    const showFilter = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        document.querySelector('.App')?.classList.add('Lock')
        const menu = document.querySelector('.FilterContainer')
        const menuBox = document.querySelector('.FilterBox')
        menuBox?.classList.toggle('None')
        setTimeout(() => {
            menu?.classList.toggle('FilterHide')
            menuBox?.classList.toggle('FilterBoxHide')
        }, 1);
    }

    const getPrices = async () => {
        await fetchMinMaxPrice(category).then(data => {
            setPrices(data)
        })
    }

    const getItems = async (brandPreset, firstPage) => {
        setLoading(true)
        const uid = v4()
        fetchId.current = uid
        await fetchItems(category, brand_check.brand ? [...[brand_check.brand], ...checkedBrands] : checkedBrands, checkedModels, checkedSizes, grid, checkedPrices, sort.value, items.limit, firstPage ? 1 : items.page, search && search)
            // await fetchItems(category, brand_check.brand ? [...[brand_check.brand], ...checkedBrands] : checkedBrands, brand_check.model ? [...[brand_check.model], ...checkedModels] : checkedModels, checkedSizes, grid, checkedPrices, sort.value, items.limit, firstPage ? 1 : items.page)
            .then(data => {
                if (uid === fetchId.current) {
                    items.setItems(data.items)
                    setTotalPages(Math.ceil(data.items.count / items.limit))
                    setLoading(false)
                    setSizes(data.sizesDB)
                }
            })
    }

    useEffect(() => {
        getPrices()
        brand_check.setBrand('')
        brand_check.setModel('')
        setCheckedBrands([])
        setCheckedModels([])
        // eslint-disable-next-line
    }, [category])

    useEffect(() => {
        if (brand_check.brand) {
            getItems([brand_check.brand])
        } else {
            getItems()
        }
        // eslint-disable-next-line
    }, [checkedSizes, checkedBrands, checkedModels, checkedPrices, sort, grid, items.page, items.limit, category, brand_check.brand, brand_check.model])

    useEffect(() => {
        if (popular) {
            setSort(sortOptions[0])
        }
        // eslint-disable-next-line
    }, [popular])

    useEffect(() => {
        const handleResize = () => {
            const screen = window.innerWidth
            setWidth(screen)
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (!brandset) {
            brand_check.setBrand('')
        }
        // eslint-disable-next-line
    }, [brandset])

    useEffect(() => {
        if (!modelset) {
            brand_check.setModel('')
        }
        // eslint-disable-next-line
    }, [modelset])

    useEffect(() => {
        if (brand_check.brand) {
            setCheckedBrands([brand_check.brand])
        }
        // eslint-disable-next-line
    }, [brand_check.brand])

    useEffect(() => {
        if (brand_check.brand && brand_check.model) {
            setCheckedModels([{ model: brand_check.model, brand: brand_check.brand }])
        }
        // eslint-disable-next-line
    }, [brand_check.brand, brand_check.model])

    useEffect(() => {
        getItems()
        // eslint-disable-next-line
    }, [search])

    useEffect(() => {
        if (checkedBrands.length > 0) {
            if (checkedBrands.includes('Adidas') || checkedBrands.includes('Adidas Originals') || checkedBrands.includes('adidas')) {
                setGrid('FR')
            } else {
                setGrid('EU')
            }
        }
    }, [checkedBrands])

    return (
        <div className="CatalogueContainer MBInfo">
            <div className="BreadCrumbs">
                <span className="LastCrumb" id="/" onClick={handleNavigate}>Главная</span>
                <span className="SlashCrumb">/</span>
                <span className="NewCrumb">Каталог</span>
            </div>
            {search &&
                <div className="CatalogueResults">Результаты поиска <b>{search}</b></div>
            }
            <div className={`CatalogueTop ${search ? 'SearchTop' : ''}`}>
                <div className="CatalogueSub">Каталог</div>
                <div className="CatalogueSortPC" onClick={clickSortList}>
                    <span>{sort.name}</span>
                    <img src={arr} className="SortArrow" alt="Список" />
                    <div className="CatalogueSortList HiddenSortList">
                        {sortOptions.map((item, i) => (
                            <div key={i} className="SortListItem" onClick={() => setSort(item)}>{item.name}</div>
                        ))}
                    </div>
                </div>
                <div className="CatalogueSortMob">
                    <div className="CSMSort" onClick={showSort}>
                        <span>Сортировка</span>
                        <img src={sortImg} alt="Сортировка" />
                    </div>
                    <div className="CSMFilter" onClick={showFilter}>
                        <span>Фильтр</span>
                        <img src={filterImg} alt="Фильтр" />
                    </div>
                </div>
            </div>
            <div className="CatalogueContent">
                <div className="CatalogueFilters">
                    <div className="CFSub">Фильтр</div>
                    {width > 850 &&
                        <>
                            <PriceFilter category={category} min={prices.min} max={prices.max} onSelectPrice={handleSelectPrice} subtitle />
                            {category !== 'cosmetics' && category !== 'perfumery' &&
                                <SizeGridFilter onSelectGrid={handleSelectGrid} brands={checkedBrands} subtitle category={category} />
                            }
                            {category === 'shoes' &&
                                <BrandFilter category={category} onSelectBrand={handleSelectBrand} onSelectModel={handleSelectModel} brandLink={brand_check.brand} modelLink={brand_check.model} subtitle />
                            }
                            {category === 'clothes' &&
                                <BrandFilter category={category} onSelectBrand={handleSelectBrand} onSelectModel={handleSelectModel} brandLink={brand_check.brand} modelLink={brand_check.model} subtitle />
                            }
                            {category === 'shoes' &&
                                <SizeFilter brand={checkedBrands[0]} sizeGrid={grid} category={category} onSelectSize={handleSelectSize} subtitle />
                            }
                            {category === 'clothes' &&
                                <SizeFilter brand={checkedBrands[0]} sizeGrid={grid} category={category} onSelectSize={handleSelectSize} subtitle />
                            }
                        </>
                    }
                </div>
                <div className="CatalogueItems">
                    {!loading ?
                        <>
                            {items.items && items.items.map((item, i) => {
                                return (
                                    <Item key={i} item={item} globalCatalogue sizes={sizes} checkedSizes={checkedSizes} />
                                )
                            })}
                            {items.items && items.items.length === 0 &&
                                <div className="NoItems">Товары не найдены</div>
                            }
                        </>
                        :
                        <div className="LoaderBox">
                            <span className="Loader"></span>
                        </div>
                    }
                    {items.items.length !== 0 &&
                        <Pagination totalPages={totalPages} onSelectPage={handleSelectPage} />
                    }
                </div>
            </div>
            <SortMobile
                sortOptions={sortOptions}
                onSelectSort={handleSelectSort}
                selectedSort={sort}
            />
            <FilterMobile
                min={prices.min}
                max={prices.max}
                sizeGrid={grid}
                category={category}
                onSelectPrice={handleSelectPrice}
                onSelectGrid={handleSelectGrid}
                onSelectSize={handleSelectSize}
                onSelectBrand={handleSelectBrand}
                onSelectModel={handleSelectModel}
                brandLink={brand_check.brand}
                modelLink={brand_check.model}
                brands={checkedBrands}
                brand={checkedBrands[0]}
            />
        </div>
    )
})