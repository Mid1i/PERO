import {useContext, useState, useReducer} from "react";
import classNames from "classnames";
import axios from "axios";

import {adminInputs as inputs, brands, sizes} from "@utils/constants";
import {addImage, addPreview, addSizes, createSneaker} from "@api";
import {onHandleError} from "@utils/helpers";
import {ErrorPopup} from "@components";
import {adminContext} from "@services";

import "./SneakerCreating.style.scss";


export default function SneakerCreating() {
    const {creatingPopup, setCreatingPopup, setErrorPopup} = useContext(adminContext);
    const [isOpenBrandsList, setIsOpenBrandsList] = useReducer(prev => !prev, false);
    const [isOpenZoomImage, setIsOpenZoomImage] = useReducer(prev => !prev, false);
    const [inputsValue, setInputsValue] = useState({'sizes': sizes});
    const [creatingStep, setCreatingStep] = useState('images');     //TODO: изменить
    const [newSneakerId, setNewSneakerId] = useState(102);          //TODO: изменить
    const [inputsError, setInputsError] = useState({});
    const [zoomImage, setZoomImage] = useState('');
    const [images, setImages] = useState([]);
 

    const onClickBrandsItem = (brand) => {
        setInputsValue({...inputsValue, 'brand': brand});
        setIsOpenBrandsList();
    }

    const onClickImage = (event, image) => {
        event.preventDefault();
        setIsOpenZoomImage();
        setZoomImage(URL.createObjectURL(image));
    }

    const onErrorHandling = (error, func) => {
        if (error.response.status === 400) {
            if (typeof error.response.data === 'object') {
                setInputsError({...error.response.data});
            } else {
                setInputsError({'invalidData': error.response.data});
            }
        } else {
            onHandleError(error, func, setErrorPopup);
        }
    }

    const onUploadPreview = (event) => {
        event.preventDefault();

        let data = new FormData();
        data.append('preview', inputsValue.preview);
        data.append('scaledPreview', inputsValue.previewScaled);
        
        axios.post(addPreview(newSneakerId), data, {headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 'Content-Type': 'multipart/form-data'}})
             .then(() => {
                setErrorPopup({'text': 'Превью успешно добавлено'});
                setInputsError({});
             })
             .catch(error => onErrorHandling(error, () => onUploadPreview(event)))
    }

    const onUploadImage = (event) => {
        event.preventDefault();

        let data = new FormData();
        data.append('image', inputsValue.images);
        data.append('scaledImage', inputsValue.imagesScaled);

        axios.post(addImage(newSneakerId), data, {headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 'Content-Type': 'multipart/form-data'}})
             .then(response => {
                setErrorPopup({'text': 'Фото успешно добавлено'});
                setImages(prev => [...prev, response.data]);
                setInputsError({});
             })
             .catch(error => onErrorHandling(error, () => onUploadImage(event)))
    }
   
    const onSubmitForm = (event) => {
        event.preventDefault();

        if (creatingStep === 'main') {
            const data = {
                'name': inputsValue.name.trim(), 
                'description': inputsValue.description.trim(),
                'brand': inputsValue.brand.replace(' ', '_').toUpperCase(),
                'price': inputsValue.price.trim(),
                'color': inputsValue.color.trim(),
                'male': inputsValue.male,
            };

            axios.post(createSneaker, data, {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}})
                 .then(response => {
                    setNewSneakerId(response.data);
                    setCreatingStep('images');
                    setInputsError({});
                 })
                 .catch(error => onErrorHandling(error))
        } else if (creatingStep === 'sizes') {
            const data = inputsValue.sizes.filter(size => size.quantity !== 0);

            axios.post(addSizes(newSneakerId), data, {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}})
                 .then()
                 .catch(error => onErrorHandling(error))
        }
    }
    

    const genderInputsRender = (id, label, onChangeInputs) => {
        return (
            <div className="gender-item">
                <label className="gender-item__label" htmlFor={id}>{label}</label>
                <input
                    autoComplete="none"
                    className="gender-item__input"
                    checked={((inputsValue?.male && id === 'male') || (inputsValue?.male === false && id === 'female')) && true}
                    id={id} 
                    name="gender"
                    onChange={onChangeInputs}
                    type="radio"
                    required
                />
            </div>
        );
    }

    const brandElementsRender = (brand, id) => {
        return (
            <li 
                className="creating-list__el" 
                onClick={() => onClickBrandsItem(brand.replace('-', ' '))}
                key={id}
            >
                {brand.replace('-', ' ')}
            </li>
        );
    }
    
    
    return (
        <div className={classNames("admin__blackout blackout", creatingPopup && "active")}>
            <form className={classNames("admin__blackout-creating creating", creatingPopup && "active")} onSubmit={onSubmitForm}>
                <div className="creating__header">
                    <h2 className="creating__header-title">Добавление товара</h2>
                    <ul className="creating__header-list">
                        <li className={classNames("creating__header-list__el", creatingStep === 'main' && "active")}>1</li>
                        <li className="creating__header-list__line"></li>
                        <li className={classNames("creating__header-list__el", creatingStep === 'images' && "active")}>2</li>
                        <li className="creating__header-list__line"></li>
                        <li className={classNames("creating__header-list__el", creatingStep === 'sizes' && "active")}>3</li>
                    </ul>
                    <svg className="creating__header-icon" onClick={setCreatingPopup} height="20" viewBox="0 0 20 20" width="20">
                        <path d="M18.1865 20L10.0064 11.8123L1.82637 20L0 18.1748L8.19293 10L0 1.82519L1.82637 0L10.0064 8.18766L18.1865 0.0128538L20 1.82519L11.8199 10L20 18.1748L18.1865 20Z" fill="#1F1F21"/>
                    </svg>
                </div>
                {creatingStep === 'main' ? (
                    <div className="creating__main creating-main">
                        {inputs.map(({id, placeholder, type}, index) => (
                            <div className="creating-main__item" key={index}>
                                <input
                                    className="creating-main__item-input"
                                    id={id}
                                    onChange={(event) => setInputsValue({...inputsValue, [id]: event.target.value})}
                                    value={inputsValue?.[id] || ''}
                                    required
                                    type={type}
                                />
                                <label 
                                    className={classNames("creating-main__item-label", 
                                        !!inputsError?.[id] && "creating-main__item-label--error",
                                        !!inputsValue?.[id] && "creating-main__item-label--active"
                                    )} 
                                    htmlFor={id}
                                >
                                    {inputsError?.[id] || placeholder}
                                </label>
                            </div>
                        ))}
                        <div className="creating-main__item creating-main__item--description">
                            <textarea
                                className="creating-main__item-input"
                                id="description"
                                onChange={(event) => setInputsValue({...inputsValue, 'description': event.target.value})}
                                value={inputsValue?.description || ''}
                                required
                            />
                            <label 
                                className={classNames("creating-main__item-label", 
                                    !!inputsError?.description && "creating-main__item-label--error",
                                    !!inputsValue?.description && "creating-main__item-label--active"
                                )} 
                                htmlFor='description'
                            >
                                {inputsError?.description || 'Введите описание товара'}
                            </label>
                        </div>
                        <p className={classNames("creating-main__title creating-main__title--brand", inputsValue?.brand && "active")} onClick={setIsOpenBrandsList}>
                            <span>{inputsValue?.brand || 'Бренд товара'}</span>
                            <svg className={classNames(isOpenBrandsList && "active")} height="7" viewBox="0 0 10 7" width="10">
                                <path d="M9.22727 0L4.77748 0L0.770514 0C0.0848331 0 -0.258008 1.06248 0.227683 1.68532L3.92752 6.42983C4.52035 7.19006 5.48459 7.19006 6.07742 6.42983L7.48449 4.62545L9.77724 1.68532C10.2558 1.06248 9.91295 0 9.22727 0Z" fill="#828282"/>
                            </svg>
                            <ul className={classNames("creating-main__title-list creating-list", isOpenBrandsList && "active")}>
                                {brands.map(({id, brand}) => brandElementsRender(brand, id))}
                            </ul>
                        </p>
                        <p className="creating-main__title">Модель товара</p>
                        <div className="creating-main__gender">
                            {genderInputsRender('male', 'Мужская', () => setInputsValue({...inputsValue, 'male': true}))}
                            {genderInputsRender('female', 'Женская', () => setInputsValue({...inputsValue, 'male': false}))}
                        </div>
                    </div>
                ) : (creatingStep === 'images') ? (
                    <div className="creating__images creating-images">
                        <p className={classNames("creating-images__error", inputsError?.invalidData && "active")}>{inputsError?.invalidData || ''}</p>
                        <div className="creating-images__top">
                            <div className="creating-images__top-item images-item">
                                <p className="creating-images__title">Превью товара</p>
                                <label className="creating-images__preview" htmlFor="preview">
                                    {inputsValue?.preview ? (
                                        <div className="creating-images__preview-wrapper">
                                            <span className="creating-images__preview-icon">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                    <path d="M11.0585 6L11.9983 6.94L2.91959 16H1.99972V15.08L11.0585 6ZM14.658 0C14.408 0 14.148 0.1 13.9581 0.29L12.1283 2.12L15.8778 5.87L17.7075 4.04C18.0975 3.65 18.0975 3 17.7075 2.63L15.3679 0.29C15.1679 0.09 14.9179 0 14.658 0ZM11.0585 3.19L0 14.25V18H3.74948L14.8079 6.94L11.0585 3.19Z" fill="#1F1F21"/>
                                                </svg>
                                            </span>
                                            <img 
                                                alt='preview' 
                                                className="creating-images__preview-image"
                                                onClick={(event) => onClickImage(event, inputsValue.preview)} 
                                                src={URL.createObjectURL(inputsValue.preview)}
                                            />
                                        </div>
                                    ) : (
                                        <span className="creating-images__preview-button">
                                            <svg height="13" viewBox="0 0 14 13" width="14">
                                                <path d="M7.08502 0V13M0.52002 6.5H13.65" stroke="white" strokeWidth="3"/>
                                            </svg>
                                        </span>
                                    )}
                                    <input 
                                        accept="image/png, image/jpeg"
                                        className="creating-images__preview-input"
                                        onChange={(event) => setInputsValue({...inputsValue, 'preview': event.target.files[0]})}
                                        id="preview"
                                        type="file"
                                    />
                                </label>
                            </div>
                            <div className="creating-images__top-item images-item">
                                <div className="creating-images__title">
                                    <span>Масштабируемое превью товара</span>
                                    <svg fill="none" height="10" viewBox="0 0 10 10" width="10">
                                        <path d="M5 3V5.4M5 7.00379L5.00381 6.99956M5 9C7.20912 9 9 7.20912 9 5C9 2.79086 7.20912 1 5 1C2.79086 1 1 2.79086 1 5C1 7.20912 2.79086 9 5 9Z" stroke="#828282" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <p className="creating-images__title-text">Изображение, которое пользователь увидит при увеличении изображения товара (более хорошего качества)</p>
                                </div>
                                <label className="creating-images__preview" htmlFor="previewScaled">
                                    {inputsValue?.previewScaled ? (
                                        <div className="creating-images__preview-wrapper">
                                            <span className="creating-images__preview-icon">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                    <path d="M11.0585 6L11.9983 6.94L2.91959 16H1.99972V15.08L11.0585 6ZM14.658 0C14.408 0 14.148 0.1 13.9581 0.29L12.1283 2.12L15.8778 5.87L17.7075 4.04C18.0975 3.65 18.0975 3 17.7075 2.63L15.3679 0.29C15.1679 0.09 14.9179 0 14.658 0ZM11.0585 3.19L0 14.25V18H3.74948L14.8079 6.94L11.0585 3.19Z" fill="#1F1F21"/>
                                                </svg>
                                            </span>
                                            <img 
                                                alt='previewScaled' 
                                                className="creating-images__preview-image" 
                                                onClick={(event) => onClickImage(event, inputsValue.previewScaled)} 
                                                src={URL.createObjectURL(inputsValue.previewScaled)}
                                            />
                                        </div>
                                    ) : (
                                        <span className="creating-images__preview-button">
                                            <svg height="13" viewBox="0 0 14 13" width="14">
                                                <path d="M7.08502 0V13M0.52002 6.5H13.65" stroke="white" strokeWidth="3"/>
                                            </svg>
                                        </span>
                                    )}
                                    <input 
                                        accept="image/png, image/jpeg"
                                        className="creating-images__preview-input"
                                        onChange={(event) => setInputsValue({...inputsValue, 'previewScaled': event.target.files[0]})}
                                        id="previewScaled"
                                        type="file"
                                    />
                                </label>
                            </div>
                        </div>
                        {(inputsValue?.preview && inputsValue?.previewScaled) && (
                            <button className="creating-images__upload" onClick={onUploadPreview}>Загрузить превью товара</button>
                        )}
                        <p className="creating-images__title">Дополнительные изображения товара</p>
                        <div className="creating-images__top">
                            <div className="creating-images__top-item images-item">
                                <p className="creating-images__title">Обычное фото</p>
                                <label className="creating-images__preview" htmlFor="image">
                                    {inputsValue?.images ? (
                                        <div className="creating-images__preview-wrapper">
                                            <span className="creating-images__preview-icon">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                    <path d="M11.0585 6L11.9983 6.94L2.91959 16H1.99972V15.08L11.0585 6ZM14.658 0C14.408 0 14.148 0.1 13.9581 0.29L12.1283 2.12L15.8778 5.87L17.7075 4.04C18.0975 3.65 18.0975 3 17.7075 2.63L15.3679 0.29C15.1679 0.09 14.9179 0 14.658 0ZM11.0585 3.19L0 14.25V18H3.74948L14.8079 6.94L11.0585 3.19Z" fill="#1F1F21"/>
                                                </svg>
                                            </span>
                                            <img 
                                                alt='preview' 
                                                className="creating-images__preview-image"
                                                onClick={(event) => onClickImage(event, inputsValue.images)} 
                                                src={URL.createObjectURL(inputsValue.images)}
                                            />
                                        </div>
                                    ) : (
                                        <span className="creating-images__preview-button">
                                            <svg height="13" viewBox="0 0 14 13" width="14">
                                                <path d="M7.08502 0V13M0.52002 6.5H13.65" stroke="white" strokeWidth="3"/>
                                            </svg>
                                        </span>
                                    )}
                                    <input 
                                        accept="image/png, image/jpeg"
                                        className="creating-images__preview-input"
                                        onChange={(event) => setInputsValue({...inputsValue, 'images': event.target.files[0]})}
                                        id="image"
                                        type="file"
                                    />
                                </label>
                            </div>
                            <div className="creating-images__top-item images-item">
                                <div className="creating-images__title">
                                    <span>Масштабируемое фото</span>
                                    <svg fill="none" height="10" viewBox="0 0 10 10" width="10">
                                        <path d="M5 3V5.4M5 7.00379L5.00381 6.99956M5 9C7.20912 9 9 7.20912 9 5C9 2.79086 7.20912 1 5 1C2.79086 1 1 2.79086 1 5C1 7.20912 2.79086 9 5 9Z" stroke="#828282" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <p className="creating-images__title-text">Изображение, которое пользователь увидит при увеличении изображения товара (более хорошего качества)</p>
                                </div>
                                <label className="creating-images__preview" htmlFor="imageScaled">
                                    {inputsValue?.imagesScaled ? (
                                        <div className="creating-images__preview-wrapper">
                                            <span className="creating-images__preview-icon">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                    <path d="M11.0585 6L11.9983 6.94L2.91959 16H1.99972V15.08L11.0585 6ZM14.658 0C14.408 0 14.148 0.1 13.9581 0.29L12.1283 2.12L15.8778 5.87L17.7075 4.04C18.0975 3.65 18.0975 3 17.7075 2.63L15.3679 0.29C15.1679 0.09 14.9179 0 14.658 0ZM11.0585 3.19L0 14.25V18H3.74948L14.8079 6.94L11.0585 3.19Z" fill="#1F1F21"/>
                                                </svg>
                                            </span>
                                            <img 
                                                alt='previewScaled' 
                                                className="creating-images__preview-image" 
                                                onClick={(event) => onClickImage(event, inputsValue.imagesScaled)} 
                                                src={URL.createObjectURL(inputsValue.imagesScaled)}
                                            />
                                        </div>
                                    ) : (
                                        <span className="creating-images__preview-button">
                                            <svg height="13" viewBox="0 0 14 13" width="14">
                                                <path d="M7.08502 0V13M0.52002 6.5H13.65" stroke="white" strokeWidth="3"/>
                                            </svg>
                                        </span>
                                    )}
                                    <input 
                                        accept="image/png, image/jpeg"
                                        className="creating-images__preview-input"
                                        onChange={(event) => setInputsValue({...inputsValue, 'imagesScaled': event.target.files[0]})}
                                        id="imageScaled"
                                        type="file"
                                    />
                                </label>
                            </div>
                        </div>
                        {(inputsValue?.images && inputsValue?.imagesScaled) && (
                            <button className="creating-images__upload" onClick={onUploadImage}>Загрузить фото</button>
                        )}
                    </div>
                ) : (
                    <div className="creating__sizes creating-sizes">
                        <p className={classNames("creating-sizes__title", Object.keys(inputsError).length !== 0 && "creating-sizes__title--error")}>{Object.keys(inputsError).length !== 0 ? 'Количество товара должно находиться в диапазоне от 10 до 1000' : inputsError.addSizes?.sneakerSizes || 'Введите количество товаров:'}</p>
                        <div className="creating-sizes__block">
                            {inputsValue.sizes.map(({size, quantity}, index) => (
                                <div className="creating-sizes__block-item sizes-item" key={index}>
                                    <p className="sizes-item__size">{size}</p>
                                    <input 
                                        className={classNames("sizes-item__input", inputsError?.[`addSizes.sneakerSizes[${index}].quantity`] && "sizes-item__input--error")}
                                        onChange={(event) => setInputsValue({...inputsValue, 'sizes': [...inputsValue.sizes.slice(0, index), {'size': size, 'quantity': event.target.value}, ...inputsValue.sizes.slice(index + 1)]})}
                                        value={quantity}
                                        title="Количество товара должно быть в диапазоне от 10 до 1000"
                                        type="number"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="creating__footer">
                    <button className="creating__footer-page">Демоверсия страницы товара</button>
                    <div className="creating__footer-right">
                        {creatingStep !== 1 && <button onClick={() => setCreatingStep(prev => prev - 1)}>Назад</button>}
                        <button>Далее</button>
                    </div>
                </div>
            </form>

            <div className={classNames("creating-blackout blackout", isOpenZoomImage && "active")}>
                <img
                    alt={inputsValue.name}
                    className={classNames("creating-zoom", isOpenZoomImage && "active")}
                    onClick={setIsOpenZoomImage}
                    src={zoomImage}
                />
            </div>
            <ErrorPopup/>
        </div>
    );
}