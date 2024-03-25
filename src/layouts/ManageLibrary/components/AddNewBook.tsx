import { useOktaAuth } from "@okta/okta-react"
import { useState } from "react";

export const AddNewBook = () => {

    const {authState} = useOktaAuth();

    //New Book
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [Description, setDescription] = useState('');
    const [copies, setCopies] = useState(0);
    const [category, setCategory] = useState('');
    const [selectedImage, setSelectedImage] = useState<any>(null);
    
    //Display


    return();
}