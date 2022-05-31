import React, { useEffect } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../actions';
import { IoIosArrowDown } from 'react-icons/io';

function MenuHeader() {
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, []);

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.name}>

                    {
                        category.parentId ? <a href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>{category.name}</a> :
                        <span>
                            {category.name} 
                            {category.children.length > 0 ? <IoIosArrowDown style={{position:'absolute', top: '13px'}}/> : ""}
                        </span>
                    }

                    {category.children.length > 0 ? (
                        <ul>{renderCategories(category.children)}</ul>
                    ) : null}
                </li>
            );
        }

        return myCategories;
    };

    return (
        <div className="menuHeader">
            <ul>
                {category.categories && renderCategories(category.categories)}
            </ul>

        </div>
    )
}

export default MenuHeader
