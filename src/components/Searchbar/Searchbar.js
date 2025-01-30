import React, { useState } from 'react';
import style from './Searchbar.module.css';
import { MdClose } from "react-icons/md";

export function Searchbar({ placeholder, onChange }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        onChange && onChange(e); // Notifica o componente pai, se necessário
    };

    const handleClear = () => {
        setInputValue(''); // Limpa o valor interno
        onChange && onChange({ target: { value: '' } }); // Notifica o componente pai com o valor vazio
    };

    return (
        <div className={style.searchbar}>
            <input
                type="text"
                placeholder={placeholder}
                value={inputValue}
                className={style.searchbar_input}
                onChange={handleInputChange}
            />
            {inputValue && (
                <MdClose className={style.searchbar_icon} onClick={handleClear} />
            )}
        </div>
    );
}
