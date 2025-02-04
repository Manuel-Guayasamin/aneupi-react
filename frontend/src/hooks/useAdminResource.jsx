import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useAdminResource = (fetchAction, deleteAction, resourceName) => {
	const dispatch = useDispatch();
	const resources = useSelector((state) => state[resourceName][resourceName]);
	const loading = useSelector((state) => state[resourceName].loading);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [deleteId, setDeleteId] = useState(null);
	const [showRegistroModal, setShowRegistroModal] = useState(false);
	const [showActualizarModal, setShowActualizarModal] = useState(false);
	const [resourceSelected, setResourceSelected] = useState(null);
	const [pagination, setPagination] = useState({
		totalPages: 0,
		currentPage: 1,
		pageSize: 10,
		totalItems: 0,
	});
	const [resourceUpdated, setResourceUpdated] = useState({
		isRegisted: { name: resourceName, value: false },
		isUdated: { name: resourceName, value: false },
		isDeleted: { name: resourceName, value: false },
	});
	useEffect(() => {
		dispatch(fetchAction({ page: pagination.currentPage, pageSize: pagination.pageSize }));
		// console.log("cambios")
	}, [resourceUpdated, pagination]);

	const handleDeleteResource = async (id) => {
		try {
			dispatch(deleteAction(id)).then(() => {
				dispatch(fetchAction());
			});
		} catch (error) {
			toast.error(`Error al eliminar ${resourceName}`);
		}
	};

	const openConfirmation = (id) => {
		setDeleteId(id);
		setShowConfirmation(true);
	};

	const closeConfirmation = () => {
		setDeleteId(null);
		setShowConfirmation(false);
	};

	const confirmDelete = () => {
		handleDeleteResource(deleteId);
		closeConfirmation();
	};

	const openRegistroModal = () => {
		setShowRegistroModal(true);
	};

	const openActualizarModal = (resource) => {
		setResourceSelected(resource);
		setShowActualizarModal(true);
	};

	const closeRegistroModal = () => {
		setShowRegistroModal(false);
	};

	const closeActualizarModal = () => {
		setShowActualizarModal(false);
	};

	return {
		resources,
		loading,
		showConfirmation,
		deleteId,
		openConfirmation,
		closeConfirmation,
		confirmDelete,
		showRegistroModal,
		showActualizarModal,
		resourceSelected,
		openRegistroModal,
		openActualizarModal,
		closeRegistroModal,
		closeActualizarModal,
		pagination,
		setPagination,
		resourceUpdated,
		setResourceUpdated,
	};
};

export default useAdminResource;
