import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import request from '../../services/ajaxManager';
import login from "../public/sign_action/login";

class ArticleList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            add: false,
            edit: null,
            editorState: '',
            editorStateE: '',
            sizes: [],
            materials: [],
            material_images: [],
            titleInput: '',
        };
    }

    componentWillMount() {
        this.handleGet();
    }

    handleGet() {
        let _this = this;
        request(
            'article/',
            'GET',
            null,
            {},
            function (response) {
                _this.setState({articles: response});
            },
        );

        request(
            'product/categories',
            'GET',
            null,
            {},
            function (response) {
                _this.setState({categories: response})
            }
        )
    }

    handleAdd() {

        if (this.state.titleInput.trim() !== '') {
            let data = new FormData();

            let arr = []
            for (let i = 0; i < this.examplesFiles.files.length; i++) {
                arr.push(this.examplesFiles.files[i])

            }

            data.append('title', this.state.titleInput);
            data.append('content', this.state.editorState);
            data.append('icon', this.iconInput.files[0])
            data.append('category', this.state.selectedCategory)
            data.append('utp', this.state.utp)

            arr.map(item => data.append('images[]', item))
            data.append(`sizes`, JSON.stringify(this.state.sizes))
            data.append(`materials`, JSON.stringify(this.state.materials))
            this.state.material_images.map((item, index) => data.append(`material_images[${index}]`, item.image))

            let _this = this;

            request(
                'article/',
                'POST',
                data,
                {},
                function (response) {
                    let arr = _this.state.articles;
                    arr.push(response);
                    _this.setState({articles: arr, add: false});
                },
                this.state.errorCallback
            );
        } else {
            window.alert('Необходимо заполнить обязательные поля')
        }
    }

    handleEdit(item) {

        let arr = []
        let data = new FormData()

        data.append("id", item.id)
        data.append('title', this.state.titleInput)
        data.append('content', this.state.editorStateE)
        if (this.iconInput.files[0]) {
            data.append('icon', this.iconInput.files[0] ? this.iconInput.files[0] : item.icon)
        }
        data.append('category', this.state.selectedCategory ? this.state.selectedCategory : item.category && item.category.id ? item.category.id : null)
        data.append('utp', this.state.utp ? this.state.utp : '')

        if (this.examplesFiles.files.length !== 0) {
            for (let i = 0; i < this.examplesFiles.files.length; i++) {
                arr.push(this.examplesFiles.files[i])
            }
            arr.map(item => data.append('images[]', item))
        }

        data.append(`sizes`, JSON.stringify(this.state.sizes))
        data.append(`materials`, JSON.stringify(this.state.materials))
        
        this.state.material_images.map((item, index) => data.append(`material_images[${index}]`, item.image))

        let _this = this;

        request(
            'article/',
            'POST',
            data,
            {},
            function (response) {
                let arr = _this.state.articles;

                _this.setState({
                    articles: arr,
                    edit: null,
                    editorStateE: ''
                }, () => _this.handleGet());
            },
            this.state.errorCallback
        );
    }

    handleDelete(key) {
        let data = {
            id: this.state.articles[key].id,
        };

        let _this = this;

        request(
            'article/',
            'DELETE',
            data,
            {},
            function (response) {
                let arr = _this.state.articles;
                arr.splice(key, 1);
                _this.setState({articles: arr});
            },
        );
    }

    handleAddMaterial = () => {

        if (this.validMaterials()) {
            window.alert('Необходимо заполнить все поля')
        } else {
            let materialDataImages = this.state.material_images
            let materialData = this.state.materials

            if (this.materialsImages.files[0]) {
                materialDataImages.push({
                    image: this.materialsImages.files[0]
                })
            } else {
                materialDataImages.push({
                    image: null
                })
            }

            materialData.push({
                title: this.state.materialTitle,
                content: this.state.materialContent,
            })

            

            this.setState({
                material_images: materialDataImages,
                materials: materialData,
                materialContent: '',
                materialTitle: ''
            }, () => this.materialsImages.value = null)
        }
    }

    handleAddSize = () => {
        if (this.validSizes()) {
            window.alert('Необходимо заполнить все поля')
        } else {
            let sizeData = this.state.sizes

            sizeData.push({
                title: this.state.sizeTitle,
                content: this.state.sizeContent
            })
            this.setState({sizes: sizeData, sizeContent: '', sizeTitle: ''})
        }
    }


    onEditorStateChange = (e) => {
        this.setState({
            editorState: e.target.value,
        });
    };

    onEditorStateChangeE = (e) => {
        this.setState({
            editorStateE: e.target.value,
        });
    };

    renderSelectItems() {
        if (this.state.categories) {
            return this.state.categories.sort(function (a, b) {
                if (a.title > b.title) {
                    return 1;
                } else if (a.title < b.title) return -1;
                else return 0;
            }).map((category, key) => {
                    if (category.children.length > 0) {
                        let arr = [
                            <option value={category.id} key={key}>{category.title}</option>,
                        ];
                        category.children.sort(function (a, b) {
                            if (a.title > b.title) {
                                return 1;
                            } else if (a.title < b.title) return -1;
                            else return 0;
                        }).map((subCategory, index) => {
                            arr.push(<option key={index + 'sub'}
                                             value={subCategory.id}>{category.title} -- {subCategory.title}</option>);
                        })
                        return arr;
                    } else {
                        return <option value={category.id} key={key}>{category.title}</option>
                    }
                }
            )
        }
    }

    handleSelectValue = (e) => {
        this.setState({selectedCategory: e.target.value})
    }

    removeMaterial(index) {
        let materials = this.state.materials
        let materials_images = this.state.material_images
        materials_images.splice(index, 1)
        materials.splice(index, 1)

        this.setState({materials, materials_images})
    }

    removeSizes(index, item) {
        if (item) {
            let sizes = item.sizes

            sizes.map(item => {
                if (item.id === index) {
                    item.delete = 1
                    item.id = index
                }
            })

            let data = new FormData()

            data.append("id", item.id)
            data.append('sizes', JSON.stringify(sizes))
            item.images.map(item => data.append('images[]', item))
            data.append('title', item.title);
            data.append('content', item.content);
            data.append('icon', item.icon)
            data.append('category', item.category.id)
            data.append('utp', item.utp)

            let _this = this

            request(
                'article/',
                'POST',
                data,
                {},
                function (response) {
                    _this.handleGet()
                },
            );
        } else {
            let sizes = this.state.sizes
            sizes.splice(index, 1)

            this.setState({sizes})
        }
    }


    renderMaterialsList = () => {
        if (this.state.materials.length !== 0) {

            return this.state.materials.map((item, index) => {
                return (
                    <div key={index} className='d-flex justify-content-center align-items-center'>
                        <p className='pr-2 w-50'>{index + 1}. {item.title}</p>
                        {
                            this.state.edit
                                ?
                                <input type='checkbox' className='w-50'
                                       onChange={() => {
                                           let materials = this.state.materials
                                           materials[index].delete = item.delete ? item.delete === 1 ? 0 : 1 : 1
                                           this.setState({materials})
                                       }}/>
                                :
                                <DeleteForeverIcon className='w-50' onClick={() => this.removeMaterial(index)}/>
                        }
                    </div>
                )
            })
        }
        return <p>Материалы пока что не добавлены</p>
    }

    renderSizesList = () => {
        if (this.state.sizes.length !== 0) {
            return this.state.sizes.map((item, index) => {
                return (
                    <div key={index} className='d-flex justify-content-center align-items-center'>
                        <p className='pr-3 py-2 w-50 m-0'>{index + 1}. {item.title}</p>
                        {
                            this.state.edit
                                ?
                                <input type='checkbox' className='w-50'
                                       value={item.delete ? item.delete === 1 : false} onChange={() => {
                                    let sizes = this.state.sizes
                                    sizes[index].delete = item.delete ? item.delete === 1 ? 0 : 1 : 1
                                    this.setState({sizes})
                                }}/>
                                :
                                <DeleteForeverIcon className='w-50' onClick={() => this.removeSizes(index)}/>
                        }
                    </div>
                )
            })
        }
        return <p>Материалы пока что не добавлены</p>
    }

    validMaterials() {
        return !(this.state.materialTitle
            && this.state.materialTitle.trim() !== ''
            && this.state.materialContent
            && this.state.materialContent.trim() !== '');
    }

    validSizes() {
        return !(this.state.sizeTitle
            && this.state.sizeTitle.trim() !== ''
            && this.state.sizeContent
            && this.state.sizeContent !== '')
    }

    handleAddElement = async (key) => {

        let item = this.state.articles[key]

        

        let materialsImages = []
        if (item.materials && item.materials.length !== 0) {
            item.materials.map(item => {
                if (Object.keys(item).includes('image')) {
                    materialsImages.push({image: item.image})
                } else {
                    materialsImages.push({image: null})
                }
            })
        }

        let materials = []
        if (item.materials && item.materials.length !== 0) {
            item.materials.map(item => {
                materials.push({
                    id: item.id,
                    title: item.title,
                    content: item.content,
                })
            })
        }

        let sizes = []

        if (item.sizes && item.sizes.length !== 0) {
            item.sizes.map(item => sizes.push(item))
        }

        await this.setState({
            sizes,
            materials,
            material_images: materialsImages,
            titleInput: item.title,
            selectedCategory: item.category ? item.category.id : null,
            utp: item.utp ? item.utp : null
        })
    }

    viewAdd() {
        if (this.state.add) {
            return (
                <tr>
                    <td colSpan={3}>
                        <form>
                            <input
                                name="title"
                                type="text"
                                placeholder={"Заголовок:*"}
                                className={'form-control input-group'}
                                value={this.state.titleInput}
                                onChange={(e) => this.setState({titleInput: e.target.value})}
                            />
                            <br/>
                            <div className='d-flex flex-row mt-3'>
                                <label>Текст статьи</label>
                                <textarea
                                    className="mx-3 w-75 form-control input-group"
                                    defaultValue={this.state.editorState}
                                    value={this.state.editorState}
                                    onChange={this.onEditorStateChange}
                                >

                                </textarea>
                            </div>
                            
                            <br/>
                            <div className='d-flex justify-content-between flex-column'>
                                <div className='d-flex flex-row mt-3'>
                                    <p className='d-flex flex-row mt-3 w-25'>Выбор категории</p>
                                    <select className="custom-select w-50" onChange={this.handleSelectValue}
                                            value={this.state.selectedCategory}>
                                        <option onClick={() => this.setState({selectedCategory: null})} value={null}>Не
                                            выбрано
                                        </option>
                                        {this.renderSelectItems()}
                                    </select>
                                </div>
                                <hr className='w-100 text-dark my-1'/>
                                <div className='d-flex flex-row align-items-center py-3'>
                                    <p className='m-0 w-25 text-left'>Создание размеров изделия</p>
                                    <div className='d-flex flex-column w-50'>
                                        <input className='mx-3 w-75 mb-3 form-control input-group' type="text" placeholder='Введите размер'
                                               value={this.state.sizeTitle}
                                               onChange={(e) => this.setState({sizeTitle: e.target.value})}/>
                                        <textarea className='mx-3 w-75 form-control input-group' placeholder='Введите описание размера'
                                                  value={this.state.sizeContent}
                                                  onChange={(e) => this.setState({sizeContent: e.target.value})}/>
                                    </div>
                                    <div className='w-50 d-flex flex-column'>
                                        <div className='w-100 d-flex justify-content-center mb-3'>
                                            <div className="btn btn-success" onClick={() => this.handleAddSize()}>
                                                <i className={'fa fa-plus'}>Добавить размер</i>
                                            </div>
                                        </div>
                                        <div className='w-100 mt-3'>
                                            {
                                                this.state.sizes.length !== 0
                                                    ?
                                                    <>
                                                        <div className='d-flex'>
                                                            <p className='m-0 p-0 w-50'>Размер</p>
                                                            <p className='m-0 p-0 w-50'>Удаление</p>
                                                        </div>
                                                        {
                                                            this.renderSizesList()
                                                        }
                                                    </>
                                                    :
                                                    this.renderSizesList()
                                            }
                                        </div>
                                    </div>
                                </div>
                                <hr className='w-100 text-dark my-1'/>
                                <div className='d-flex flex-row align-items-center py-3'>
                                    <p className='m-0 w-25 text-left'>Создание материалов изделия</p>
                                    <div className='d-flex flex-row w-100 justify-content-between'>
                                        <div className='d-flex flex-column w-50 pb-3'>
                                            <input className='mx-3 mb-3 w-75 form-control input-group' type="text"
                                                   placeholder='Введите название материала'
                                                   value={this.state.materialTitle}
                                                   onChange={(e) => this.setState({materialTitle: e.target.value})}/>
                                            <textarea className='mx-3 w-75 mb-3 form-control input-group'
                                                      placeholder='Введите описание материала'
                                                      value={this.state.materialContent}
                                                      onChange={(e) => this.setState({materialContent: e.target.value})}/>
                                            <form
                                                className='d-flex justify-content-center w-75 flex-row align-items-center'>
                                                <p className='m-0 pr-1'>Изображение материала</p>
                                                <input
                                                    name="file"
                                                    type="file"
                                                    required={true}
                                                    className={'form-control input-group w-50'}
                                                    ref={(input) => {
                                                        this.materialsImages = input
                                                    }}
                                                    accept=".jpg, .jpeg, .png"
                                                />
                                                <br/>
                                            </form>
                                        </div>
                                        <div className='d-flex flex-column w-50'>
                                            <div className='w-100'>
                                                <div className="btn btn-success"
                                                     onClick={() => this.handleAddMaterial()}>
                                                    <i className={'fa fa-plus'}>Добавить материал</i>
                                                </div>
                                            </div>
                                            <div className='w-100 mt-3'>
                                                {
                                                    this.state.materials.length !== 0
                                                        ?
                                                        <>
                                                            <div className='d-flex'>
                                                                <p className='w-50'>Материал</p>
                                                                <p className='w-50'>Удаление</p>
                                                            </div>
                                                            {this.renderMaterialsList()}
                                                        </>
                                                        :
                                                        this.renderMaterialsList()
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className='w-100 text-dark my-1'/>
                                <div className='d-flex flex-row align-items-center py-3'>
                                    <p className='m-0 w-25 text-left'>УТП</p>
                                    <input className='mx-3 w-25 form-control input-group' type="text" placeholder='Введите УТП'
                                           onChange={(e) => this.setState({utp: e.target.value})}/>
                                </div>
                                <hr className='w-100 text-dark my-1'/>
                                <div className='d-flex flex-row align-items-center py-3'>
                                    <p className='m-0 w-25 text-left'>Файлы примеров изделий</p>
                                    <form className='d-flex justify-content-center w-50'>
                                        <input
                                            name="file"
                                            type="file"
                                            required={true}
                                            placeholder={"Файл с даными:*"}
                                            className={'form-control input-group w-50'}
                                            ref={(input) => {
                                                this.examplesFiles = input
                                            }}
                                            multiple
                                            accept=".jpg, .jpeg, .png"
                                        />
                                        <br/>
                                    </form>
                                </div>
                                <hr className='w-100 text-dark my-1'/>
                                <div className='d-flex flex-row align-items-center py-3'>
                                    <p className='m-0 w-25 text-left'>Файл превью швейного цеха</p>
                                    <form className='d-flex justify-content-center w-50'>
                                        <input
                                            name="file"
                                            type="file"
                                            required={true}
                                            placeholder={"Файл с даными:*"}
                                            className={'form-control input-group w-50'}
                                            ref={(input) => {
                                                this.iconInput = input
                                            }}
                                            accept=".jpg, .jpeg, .png"
                                        />
                                        <br/>
                                    </form>
                                </div>
                            </div>
                            <hr className='w-100 text-dark my-1'/>
                            <p className="text-center py-3">
                                <div className="btn btn-success" onClick={() => this.handleAdd()}>
                                    <i className={'fa fa-plus'}>Создать швейный цех</i>
                                </div>
                                <button className={'btn btn-warning'} onClick={() => {
                                    this.setState({add: false})
                                }}>
                                    <i className={'fa fa-times'}>Отмена</i>
                                </button>
                            </p>
                        </form>
                    </td>
                </tr>
            );
        } else {
            return (
                <tr>
                    <td></td>
                    <td></td>
                    <td>
                        <button className={'btn btn-success'} onClick={() => {
                            this.setState({
                                add: true,
                                edit: false,
                                editorState: ''
                              }, () => this.setState({
                                material_images: [],
                                sizes: [],
                                materials: [],
                                titleInput: '',
                                utp: '',
                                selectedCategory: null
                            }))
                        }}>
                            <i className={'fa fa-plus'}> Добавить</i>
                        </button>
                    </td>
                </tr>
            );
        }

    }

    render() {
        return (
            <div className='w-100'>
                <h4 className="text-center">Управление швейным цехом</h4>
                <table className={"table table-striped table-hover"}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Заголовок</th>
                        <th>Управление</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.viewAdd()}
                    {this.state.articles.length > 0 ? this.state.articles.map((item, key) => {
                        if (this.state.edit === key) {
                            return (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td className='w-100'>
                                        <form className='w-100'>
                                            <input
                                                name="title"
                                                type="text"
                                                placeholder={"Заголовок:*"}
                                                className={'form-control input-group'}
                                                defaultValue={this.state.titleInput}
                                                value={this.state.titleInput}
                                                onChange={(e) => this.setState({titleInput: e.target.value})}
                                            />
                                            <br/>
                                            <div className='d-flex flex-row mt-3'>
                                                <label>Текст статьи (Редактирование)</label>
                                                <textarea
                                                    className="mx-3 w-75 form-control input-group"
                                                    defaultValue={this.state.editorStateE}
                                                    value={this.state.editorStateE}
                                                    onChange={this.onEditorStateChangeE}
                                                    rows={10}
                                                >

                                                </textarea>
                                            </div>

                                            <br/>
                                            <div className='d-flex justify-content-between flex-column'>
                                                <div className='d-flex flex-row mt-3'>
                                                    <p className='d-flex flex-row mt-3 w-25'>Выбор категории</p>
                                                    <select className="custom-select w-50"
                                                            onChange={this.handleSelectValue}
                                                            value={this.state.selectedCategory}>
                                                        <option onClick={() => this.setState({selectedCategory: null})}
                                                                value={null}>Не
                                                            выбрано
                                                        </option>
                                                        {this.renderSelectItems()}
                                                    </select>
                                                </div>
                                                <hr className='w-100 text-dark my-1'/>
                                                <div className='d-flex flex-row align-items-center py-3'>
                                                    <p className='m-0 w-25 text-left'>Управление размерами изделия</p>
                                                    <div className='d-flex flex-column w-50'>
                                                        <input className='mx-3 w-75 mb-3 form-control input-group'
                                                               type="text"
                                                               placeholder='Введите размер'
                                                               value={this.state.sizeTitle}
                                                               onChange={(e) => this.setState({sizeTitle: e.target.value})}/>
                                                        <textarea className='mx-3 w-75 form-control input-group'
                                                                  placeholder='Введите описание размера'
                                                                  value={this.state.sizeContent}
                                                                  onChange={(e) => this.setState({sizeContent: e.target.value})}/>
                                                    </div>
                                                    <div className='w-50 d-flex flex-column'>
                                                        <div className='w-100 d-flex justify-content-center mb-1'>
                                                            <div className="btn btn-success"
                                                                 onClick={() => this.handleAddSize()}>
                                                                <i className={'fa fa-plus'}>Добавить размер</i>
                                                            </div>
                                                        </div>
                                                        <div className='w-100 mt-3'>
                                                            {
                                                                this.state.sizes.length !== 0
                                                                    ?
                                                                    <>
                                                                        <div className='d-flex'>
                                                                            <p className='m-0 p-0 w-50'>Размер</p>
                                                                            <p className='m-0 p-0 w-50'>Удаление</p>
                                                                        </div>
                                                                        {
                                                                            this.renderSizesList()
                                                                        }
                                                                    </>
                                                                    :
                                                                    this.renderSizesList()
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className='w-100 text-dark my-1'/>
                                                <div className='d-flex flex-row align-items-center py-3'>
                                                    <p className='m-0 w-25 text-left'>Создание материалов изделия</p>
                                                    <div className='d-flex flex-row w-100 justify-content-between'>
                                                        <div className='d-flex flex-column w-50 pb-3'>
                                                            <input className='mx-3 mb-3 w-75 form-control input-group'
                                                                   type="text"
                                                                   placeholder='Введите название материала'
                                                                   value={this.state.materialTitle}
                                                                   onChange={(e) => this.setState({materialTitle: e.target.value})}/>
                                                            <textarea
                                                                className='mx-3 w-75 mb-3 form-control input-group'
                                                                placeholder='Введите описание материала'
                                                                value={this.state.materialContent}
                                                                onChange={(e) => this.setState({materialContent: e.target.value})}/>
                                                            <form
                                                                className='d-flex justify-content-center w-75 flex-row align-items-center'>
                                                                <p className='m-0 pr-1'>Изображение материала</p>
                                                                <input
                                                                    name="file"
                                                                    type="file"
                                                                    required={true}
                                                                    className={'form-control w-50 form-control input-group'}
                                                                    ref={(input) => {
                                                                        this.materialsImages = input
                                                                    }}
                                                                    accept=".jpg, .jpeg, .png"
                                                                />
                                                                <br/>
                                                            </form>
                                                        </div>
                                                        <div className='d-flex flex-column w-50'>
                                                            <div className='w-100'>
                                                                <div className="btn btn-success"
                                                                     onClick={() => this.handleAddMaterial()}>
                                                                    <i className={'fa fa-plus'}>Добавить материал</i>
                                                                </div>
                                                            </div>
                                                            <div className='w-100 mt-3'>
                                                                {
                                                                    this.state.materials.length !== 0
                                                                        ?
                                                                        <>
                                                                            <div className='d-flex'>
                                                                                <p className='w-50'>Материал</p>
                                                                                <p className='w-50'>Удаление</p>
                                                                            </div>
                                                                            {this.renderMaterialsList()}
                                                                        </>
                                                                        :
                                                                        this.renderMaterialsList()
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className='w-100 text-dark my-1'/>
                                                <div className='d-flex flex-row align-items-center py-3'>
                                                    <p className='m-0 w-25 text-left'>УТП</p>
                                                    <input className='mx-3 w-25 form-control input-group' type="text"
                                                           placeholder='Введите УТП'
                                                           value={this.state.utp ? this.state.utp : ''}
                                                           onChange={(e) => this.setState({utp: e.target.value})}/>
                                                </div>
                                                <hr className='w-100 text-dark my-1'/>
                                                <div className='d-flex flex-row align-items-center py-3'>
                                                    <p className='m-0 w-25 text-left'>Файлы примеров изделий</p>
                                                    <form className='d-flex justify-content-center w-50'>
                                                        <input
                                                            name="file"
                                                            type="file"
                                                            required={true}
                                                            placeholder={"Файл с даными:*"}
                                                            className={'form-control w-50 form-control input-group'}
                                                            ref={(input) => {
                                                                this.examplesFiles = input
                                                            }}
                                                            multiple
                                                            accept=".jpg, .jpeg, .png"
                                                        />
                                                        <br/>
                                                    </form>
                                                </div>
                                                <hr className='w-100 text-dark my-1'/>
                                                <div className='d-flex flex-row align-items-center py-3'>
                                                    <p className='m-0 w-25 text-left'>Файл превью швейного цеха</p>
                                                    <form className='d-flex justify-content-center w-50'>
                                                        <input
                                                            name="file"
                                                            type="file"
                                                            required={true}
                                                            placeholder={"Файл с даными:*"}
                                                            className={'form-control w-50 form-control input-group'}
                                                            ref={(input) => {
                                                                this.iconInput = input
                                                            }}
                                                            accept=".jpg, .jpeg, .png"
                                                        />
                                                        <br/>
                                                    </form>
                                                </div>
                                            </div>
                                            <hr className='w-100 text-dark my-1'/>
                                            <p className='py-3'><strong>Внимание!</strong> При добавлении новых файлов,
                                                старые удаляются</p>
                                            <p className="text-center py-3">
                                                <div className="btn btn-success" onClick={() => this.handleEdit(item)}>
                                                    <i className={'fa fa-plus'}>Сохранить изменения</i>
                                                </div>
                                                <button className={'btn btn-warning'} onClick={() => {
                                                    this.setState({edit: false})
                                                }}>
                                                    <i className={'fa fa-times'}>Отмена</i>
                                                </button>
                                            </p>
                                        </form>
                                    </td>
                                </tr>
                            );
                        }

                        return (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{item.title}</td>
                                <td>
                                    <button className={'btn btn-primary'}
                                            onClick={() => {
                                                let contentBlock = htmlToDraft(item.content);
                                                if (contentBlock) {
                                                    let contentState = '';
                                                    let editorStateE = item.content;

                                                    this.setState({
                                                        editorStateE: editorStateE,
                                                        edit: key,
                                                        add: false
                                                    }, () => this.handleAddElement(key));

                                                } else {
                                                    this.setState({
                                                        edit: key,
                                                        material_images: [],
                                                        sizes: [],
                                                        materials: [],
                                                        titleInput: '',
                                                        utp: '',
                                                        selectedCategory: null
                                                    }, () => this.handleAddElement(key));
                                                }
                                            }}>
                                        <i className={'fa fa-edit'}> Изменить</i>
                                    </button>
                                    <button className={'btn btn-danger'}
                                            onClick={() => this.handleDelete(key)}>
                                        <i className={'fa fa-trash'}> Удалить</i>
                                    </button>
                                </td>
                            </tr>
                        );
                    }) : <tr>
                        <td colSpan={4}>Список услуг швейного цеха пуст</td>
                    </tr>}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ArticleList;