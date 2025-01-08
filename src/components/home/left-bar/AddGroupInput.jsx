import { useEffect, useState, useContext, useRef } from 'react';

import { useAddGroupMutation,useFetchGroupsQuery } from '../../../store';

import LeftBarContext from '../../../context/left-bar';

import { PLUS_SIGN_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import PlusSign from '../../../assets/svg/black-plus-sign.svg';

import styles from '../../../styles/AddGroupInput.module.css';
import { useSelector } from 'react-redux';

const AddGroupInput = () => {
    const accessToken = useSelector(state => state.auth.accessToken);
    const {formMode, toggleFormMode, toggleActiveGroup, toggleOrder, order} = useContext(LeftBarContext);

    const [addGroup, {isLoading: addGroupLoading}] = useAddGroupMutation();
    const {data, error, isLoading} = useFetchGroupsQuery(undefined, {skip: !accessToken}) || [];

    const [name, setName] = useState('');

    const formRef = useRef();

    const handleClick = () => {
        toggleFormMode(true);
    }

    const handleNameChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name !== '') {
            try {
                await addGroup(name).unwrap();
                toggleFormMode(false);
                toggleActiveGroup(name);
                console.log(data);
                toggleOrder(data.length + 1)
                setName('');
            } catch (error) {
                throw new Error(error);
            } finally {
                
            }
        }
    }

    useEffect(() => {
        if (!formMode) {
            setName('');
        }
    }, [formMode])

    useEffect(() => {
        if (order) {
            console.log('order: ', order)
        }
    }, [order]);

    useEffect(() => {
		const handleKeyDown = event => {
			if (event.key === 'Escape') {
				toggleFormMode(false);
				setName('');
			}
		};

        const handleClickOutside = event => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                toggleFormMode(false);
                setName('');
            }
        }
		window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('mousedown', handleClickOutside);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

    if (!formMode) {
        return (
            <div className={styles['add-group-input']} onClick={handleClick}>
                <div className={styles['icon-box']}>
                    <img className={styles.icon} src={PlusSign} alt={PLUS_SIGN_ALTERNATE_LABEL}/>
                </div>
                <span className={styles.label}>Add Group</span> 
            </div>)
    } else {
        return (
            <form ref={formRef} className={styles['add-group-input']} onSubmit={handleSubmit}>
                <div className={styles['icon-box']}>
                    <img className={styles.icon} src={PlusSign} alt={PLUS_SIGN_ALTERNATE_LABEL}/>
                </div>
                <input type='text' value={name} onChange={handleNameChange} autoFocus className={styles.input} maxLength={15} minLength={3} />
                <button type='submit' style={{ opacity: '0'}}></button>
            </form>)
    }
    
}

export default AddGroupInput;