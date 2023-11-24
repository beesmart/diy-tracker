import AppPage from '../../components/pages/app/AppPage';
import { PhotoIcon } from '@heroicons/react/24/outline';
import TButton from '../../components/core/TButton';
import { useState } from 'react'
import CurrencyInput from 'react-currency-input-field';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';

export default function JobsView() {

    const navigate = useNavigate();    
    const [error, setError] = useState("");

    const [job, setJob] = useState({
        title: '', 
        description: '',
        slug: '',
        status: false,
        priority: '',
        image: '',
        image_url: '',
        completion_date: '',
        est_cost: '',
        attachments: '',
        tasks: [],

    });

    const onImageChoose = (ev) => {
        // console.log("on image choose")
        const file = ev.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            setJob({ ...job, image: file, image_url: reader.result });

            ev.target.value = "";
        }

        reader.readAsDataURL(file);
    }

    const handleAttachmentChange = (ev) => {
      const files = ev.target.files;

      const attachmentArray = [];
      // Convert the FileList object to an array and update state
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
    
        // Use a closure to capture the current file in the callback
        reader.onload = (() => {
          return () => {
            attachmentArray.push({
              file: file,
              url: reader.result,
            });
    
            // If all files are processed, update the state
            if (attachmentArray.length === files.length) {
              setJob({ ...job, attachments: attachmentArray });
              ev.target.value = "";
            }
          };
        })();
    
        // Read the file as a data URL
        reader.readAsDataURL(file);
      }
    };

    const handleRemoveAttachment = (index) => {
      const updatedAttachments = [...job.attachments];
      updatedAttachments.splice(index, 1);
      setJob({ ...job, attachments: updatedAttachments });
    };


    const renderThumbnails = () => {
      return job.attachments.map((attachment, index) => (
        <div key={index} className="thumbnail-container">
          <img
            width="50px"
            src={attachment.url}
            alt={`Thumbnail ${index + 1}`}
            className="thumbnail"
          />
          <button type="button" onClick={() => handleRemoveAttachment(index)}>
            Remove
          </button>
        </div>
      ));
    };
    

    
  

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = { ...job };

        console.log(payload);

        if (payload.image) {
            payload.image = payload.image_url;
        }

        delete payload.image_url;

        axiosInstance.post('/job', payload)
        .then(res => {
          console.log(res);
          console.log(res.data);
          navigate('/app/jobs');
        })
        .catch(err => {
           if (err.response) {
            setError(err.response.data.message);
           }
        })

    }

  return (

    <AppPage title="Create New Job">
            
          <form action="#" method="POST" onSubmit={onSubmit}>
            <div className="shadow sm:overflow-hidden sm:rounded-md">

                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">

                {error && (
                <div className="bg-red-500 text-white py-3 px-3">{error}</div>
                )}
                    
                    {/*Image*/}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                        Photo
                        </label>
                        <div className="mt-1 flex items-center">
                        {job.image_url && (
                            <img
                            src={job.image_url}
                            alt=""
                            className="w-32 h-32 object-cover"
                            />
                        )}
                        {!job.image_url && (
                            <span className="flex justify-center  items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                            <PhotoIcon className="w-8 h-8" />
                            </span>
                        )}
                        <button
                            type="button"
                            className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <input
                            type="file"
                            className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                            onChange={onImageChoose}
                            />
                            Change
                        </button>
                        </div>
                    </div>
                    {/*Image*/}

                    {/*Attachment*/}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                        Image Gallery
                        </label>
                        <div className="mt-1 flex items-center">

                          {/* File input for multiple attachments */}
                          <input type="file" onChange={handleAttachmentChange} multiple />

                            {/* Display image thumbnails and allow removal */}
                              {job.attachments.length > 0 && (
                                <div>
                                  <h3>Selected Attachments:</h3>
                                  <div className="thumbnails">{renderThumbnails()}</div>
                                </div>
                            )}

                        </div>
                    </div>

                    {/*Attachment*/}

                    {/*Title*/}
                    <div className="col-span-6 sm:col-span-3">
                        <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                        >
                        Job Title
                        </label>
                        <input
                        type="text"
                        name="title"
                        id="title"
                        value={job.title}
                        onChange={(ev) =>
                            setJob({ ...job, title: ev.target.value })
                        }
                        placeholder="job Title"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    {/*Title*/}


                    {/*Description*/}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                      >
                      Description
                      </label>
                      {/* <pre>{ JSON.stringify(job, undefined, 2) }</pre> */}
                      <textarea
                      name="description"
                      id="description"
                      value={job.description || ""}
                      onChange={(ev) =>
                          setJob({ ...job, description: ev.target.value })
                      }
                      placeholder="Describe your job"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      ></textarea>
                    </div>
                    {/*Description*/}

                    {/* Priority */}

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="priority" className="block text-sm font-medium leading-6 text-gray-900">Priority</label>
                      <div className="mt-2">
                        <select 
                        id="priority" 
                        name="priority" 
                        onChange={(ev) =>
                          setJob({ ...job, priority: ev.target.value })
                        }
                        value={job.priority} 
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                    </div>

                    {/* Priority */}

                    {/* Estimated Cost */}

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="est_cost" className="block text-sm font-medium leading-6 text-gray-900">Estimated Cost - £</label>
                      <div className="mt-2">
                      <CurrencyInput
                        id="est_cost"
                        name="est_cost"
                        placeholder="Please enter a number"
                        defaultValue={50.00}
                        decimalsLimit={2}
                        onChange={(ev) => 
                          setJob({ ...job, est_cost: ev.target.value })
                        }
                      />;
                      </div>
                    </div>

                    
                    {/* Estimated */}

                    {/*Expire Date*/}
                    <div className="col-span-6 sm:col-span-3">
                        <label
                        htmlFor="completion_date"
                        className="block text-sm font-medium text-gray-700"
                        >
                        Deadline Date
                        </label>
                        <input
                        type="date"
                        name="completion_date"
                        id="completion_date"
                        value={job.completion_date}
                        onChange={(ev) =>
                            setJob({ ...job, completion_date: ev.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    {/*Expire Date*/}

                    {/*Active*/}
                    <div className="flex items-start">
                        <div className="flex h-5 items-center">
                        <input
                            id="status"
                            name="status"
                            type="checkbox"
                            checked={job.status}
                            onChange={(ev) =>
                              setJob({ ...job, status: ev.target.checked })
                            }
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        </div>
                        <div className="ml-3 text-sm">
                        <label
                            htmlFor="comments"
                            className="font-medium text-gray-700"
                        >
                            Active
                        </label>
                        <p className="text-gray-500">
                            Whether to make job publicly available
                        </p>
                        </div>
                    </div>
                    {/*Active*/}

                </div>

                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <TButton>
                      Save
                    </TButton>
                  </div>

            </div>
          </form>

    </AppPage>
  )
}
