import AppPage from '../../components/pages/app/AppPage';
import { PhotoIcon } from '@heroicons/react/24/outline';
import TButton from '../../components/core/TButton';
import { useState } from 'react'
import CurrencyInput from 'react-currency-input-field';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';

export default function JobsView() {

    const navigate = useNavigate();

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

    const onSubmit = (ev) => {
        ev.preventDefault();

        // axiosInstance.post('/job', {
        //   title: 'LoremTwo',
        //   description: 'Ipsum',
        //   status: true,
        //   priority: 'high',

        // })

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

    }

  return (

    <AppPage title="Create New Job">
            
          <form action="#" method="POST" onSubmit={onSubmit}>
            <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    
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
