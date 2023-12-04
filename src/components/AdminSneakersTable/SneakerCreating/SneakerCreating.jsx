import {useState, useReducer} from "react";
import classNames from "classnames";
import axios from "axios";

import {adminInputs as inputs, brands, sizes} from "@utils/constants";
import {addSizes, createSneaker} from "@api";

import "./SneakerCreating.style.scss";


export default function SneakerCreating() {
    const [inputsValue, setInputsValue] = useState({'sizes': sizes});
    const [inputsError, setInputsError] = useState({});
    const [newSneakerId, setNewSneakerId] = useState(102);          //TODO: изменить
    const [creatingStep, setCreatingStep] = useState('sizes');     //TODO: изменить
    const [isOpenBrandsList, setIsOpenBrandsList] = useReducer(prev => !prev, false);
 

    const onClickBrandsItem = (brand) => {
        setInputsValue({...inputsValue, 'brand': brand});
        setIsOpenBrandsList();
    }

    const onErrorHandling = (error) => {
        if (error.response.status === 400) {
            if (typeof error.response.data === 'object') {
                setInputsError({...error.response.data});
            } else {
                setInputsError({'invalidData': error.response.data});
            }
        }
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
        <div className="admin__blackout blackout active">
            <form className="admin__blackout-creating creating" onSubmit={onSubmitForm}>
                <div className="creating__header">
                    <h2 className="creating__header-title">Добавление товара</h2>
                    <ul className="creating__header-list">
                        <li className={classNames("creating__header-list__el", creatingStep === 'main' && "active")}>1</li>
                        <li className="creating__header-list__line"></li>
                        <li className={classNames("creating__header-list__el", creatingStep === 'images' && "active")}>2</li>
                        <li className="creating__header-list__line"></li>
                        <li className={classNames("creating__header-list__el", creatingStep === 'sizes' && "active")}>3</li>
                    </ul>
                    <svg className="creating__header-icon" height="20" viewBox="0 0 20 20" width="20">
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
                        <label className="creating-images__preview" htmlFor="preview">
                            {inputsValue?.preview ? (
                                <p className="creating-images__preview-name">{inputsValue.preview.name}</p>
                            ) : (
                                <span className="creating-images__button">
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
                        <label className="creating-images__preview" htmlFor="previewScaled">
                            {inputsValue?.previewScaled ? (
                                <p className="creating-images__preview-name">{inputsValue.previewScaled.name}</p>
                            ) : (
                                <span className="creating-images__button">
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
        </div>
    );
}