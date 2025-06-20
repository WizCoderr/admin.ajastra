import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import CategoryList from '../../components/seeCategory/seeCategory';
import { Api, endpoints } from '../../api';
import { toast } from 'react-toastify';
import AddCategoryPopup from '../../components/addCategory/addCategory';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const res = await Api.get(endpoints.getAllCategories);
            toast.success('Categories fetched successfully');
            setCategories(res.data.data);
        } catch (e) {
            toast.error('Error fetching categories');
        } finally {
            setLoading(false);
        }
    };
    const handleClose=()=>{
        setOpen(false)
        fetchCategories()
    }
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="p-6">
            <Button
                variant="outlined"
                color='warning'
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => setOpen(true)}
                className="text-white rounded-md shadow-md"
            >
                Add Category
            </Button>

            {open && (
                <AddCategoryPopup onClose={()=> {handleClose()}} />
            )}
            {/* Categories List */}
            <Box className="min-h-[200px]">
                {loading ? (
                    <Box className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                    </Box>
                ) : (
                    <CategoryList categories={categories} />
                )}
            </Box>
        </div>
    );
};

export default CategoriesPage;