import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    addCategory,
    updateCategories,
    deleteCategories as deleteCategoriesAction
} from "../../actions";
import Layout from "../../components/layout";

//need to install package
import CheckboxTree from 'react-checkbox-tree';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosAdd,
    IoIosTrash,
    IoIosBrush
} from 'react-icons/io'
import '../../../node_modules/react-checkbox-tree/lib/react-checkbox-tree.css';
import "./style.css";
import UpdateCategoriesModal from "./components/UpdateCategoriesModal";
import AddCategoryModal from "./components/AddCategorymodal";
import DeleteCategoryModal from "./components/DeleteCategoryModal";
import { isMobile } from "react-device-detect";

function Category() {
    const category = useSelector((state) => state.category);
    const [categoryName, setCategoryName] = useState("");
    const [parentCategoryId, setParentCategoryId] = useState("");
    const [categoryType, setCategoryType] = useState("");
    const [categoryImage, setCategoryImage] = useState("");
    const [show, setShow] = useState(false);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);

    const dispatch = useDispatch();


    useEffect(() => {
        if (!category.loading) {
            setShow(false);
        }
    }, [category.loading])

    //add category
    const handleClose = () => {
        setShow(false);
    }

    const submitAddCategoryForm = () => {

        const form = new FormData();
        if (categoryName === "") {
            alert("Category name is required")
            return;
        }
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        form.append('type', categoryType);
        dispatch(addCategory(form));
        setCategoryName('');
        setParentCategoryId('');
    }

    // for add category modal show
    const handleShow = () => setShow(true);
    //========================================>

    // category for render
    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(

                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }

                // <li key={category.name}>
                //     <input type="checkbox" name="category[]" value={category._id} onCheck={checked => setChecked(checked)} />
                //     {category.name}
                //     {category.children.length > 0 ? (
                //         <ul>{renderCategories(category.children)}</ul>
                //     ) : null}
                // </li>
            );
        }

        return myCategories;
    };
    //========================================>

    // Categories list for select option
    const createCategoryLists = (categories, options = []) => {
        for (let category of categories) {
            // if (category.level !== 3) {
            //     options.push({ value: category._id, name: category.name, parentId: category.parentId });
            // }

            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
                level: category.level,
                type: category.type
            });

            if (category.children.length > 0) {
                createCategoryLists(category.children, options);
            }
        }
        return options;
    };
    //=======================================>

    //image category input
    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    };
    //=======================================>

    // categories model show and inputs handle
    const updateCategory = () => {

        updateCheckedAndExpandedCategories();
        setUpdateCategoryModal(true);
    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryLists(category.categories);
        const checkedArray = [];
        const expandedArray = [];

        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value);
            category && checkedArray.push(category);
        })

        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value);
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
        //console.log({ checked, expanded, categories, checkedArray, expandedArray });
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type === "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type === "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }
    //=======================================>

    //update categories
    const updateCategoriesForm = () => {

        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });

        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });

        dispatch(updateCategories(form));

        setUpdateCategoryModal(false);
    }
    //=======================================>

    //delete category
    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
        //const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
        //const idsArray = expandedIdsArray.concat(checkedIdsArray);

        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray));
            setDeleteCategoryModal(false);
        }

    }
    //=======================================>

    const categoryLists = createCategoryLists(category.categories);

    return (
        <Layout sidebar>
            <Container fluid>
                <Row>
                    <Col md={6}>
                        <div style={{ margin: "5px 0" }}>
                            <h3>Categories</h3>
                        </div>
                    </Col>
                    <Col md={6} >
                        <div className="actionsBtnContainer" style={{ display: "flex", justifyContent: isMobile ? "flex-start" : "flex-end", margin: "5px 0" }}>
                            <span>Actions: </span>
                            <button onClick={handleShow}><IoIosAdd /> <span>Add</span></button>
                            <button onClick={deleteCategory}><IoIosTrash /> <span>Delete</span> </button>
                            <button onClick={updateCategory}><IoIosBrush /> <span>Edit</span></button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}

                            style={{ margin: "5px 0" }}
                        />
                    </Col>
                </Row>
            </Container>

            {/* Add Category modal */}
            <AddCategoryModal
                show={show}
                handleClose={() => setShow(false)}
                modalTitle={'Add New Category'}
                buttons={[
                    {
                        label: 'No',
                        color: 'outline-danger',
                        onClick: () => {
                            alert('no');
                            setShow(false);
                        }
                    },
                    {
                        label: category.loading ? 'Saving' : 'Save',
                        color: 'outline-info',
                        onClick: submitAddCategoryForm
                    }
                ]}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
                categoryType={categoryType}
                setCategoryType={setCategoryType}
                categoryLists={categoryLists}
                handleCategoryImage={handleCategoryImage}
            />

            {/* Edit Categories modal */}
            <UpdateCategoriesModal
                show={updateCategoryModal}
                handleClose={() => setUpdateCategoryModal(false)}
                buttons={[
                    {
                        label: 'No',
                        color: 'outline-danger',
                        onClick: () => {
                            alert('no');
                            setUpdateCategoryModal(false);
                        }
                    },
                    {
                        label: category.loading ? 'Updating' : 'Update',
                        color: 'outline-info',
                        onClick: updateCategoriesForm
                    }
                ]}
                modalTitle={'Update Categories'}
                size="lg"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryLists={categoryLists}
            />

            {/* Delete Categories modal */}
            <DeleteCategoryModal
                modalTitle="Confirm"
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                buttons={[
                    {
                        label: 'No',
                        color: 'outline-info',
                        onClick: () => {
                            alert('no');
                            setDeleteCategoryModal(false);
                        }
                    },
                    {
                        label: 'Yes',
                        color: 'outline-danger',
                        onClick: deleteCategories
                    }
                ]}
                expandedArray={expandedArray}
                checkedArray={checkedArray}
            />
        </Layout>
    );
}

export default Category;
