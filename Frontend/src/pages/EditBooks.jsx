import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
const EditBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [file, setPdfFile] = useState("");
  const [loading, setLoding] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setLoding(true);
    axios
      .get(`http://localhost:8000/books/${id}`)
      .then((Response) => {
        setTitle(Response.data.title);
        setAuthor(Response.data.author);
        setPublishYear(Response.data.publishYear);
        setPdfFile(Response.data.file);
        setLoding(false);
      })
      .catch((Error) => {
        console.log(Error);
        setLoding(false);
        alert("An Error hanppen ,Please check console");
      });
  }, []);

  const handelEditBook = async () => {
    const data = {
      title,
      author,
      publishYear,
      file,
    };
    setLoding(true);
    await axios
      .put(`http://localhost:8000/books/${id}`, data)
      .then(() => {
        setLoding(false);
        enqueueSnackbar("Book Edit Successfully", { variant: "success" });
        navigate("/");
        // await data.save();
      })
      .catch((error) => {
        console.log(Error);
        setLoding(false);
        // alert("An error happened ,please Check console");
        enqueueSnackbar("Error ", { variant: "error" })
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : " "}
      <div className="flex flex-col border-sky-300 rounded-xl w-[600px] p-4 mx-auto border-2">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500"> Title</label>
          <input
            type="text"
            name=""
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500"> Author</label>
          <input
            type="text"
            name=""
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500"> Publish Year</label>
          <input
            type="text"
            name=""
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500"> PDF</label>
          <input
            type="file"
            accept="application/pdf"
            // value={file}
            onChange={(e) => setPdfFile(e.target.files[0])}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handelEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBooks;
