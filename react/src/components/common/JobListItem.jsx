import React from 'react'
import { TrashIcon, PencilIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import TButton from '../core/TButton'

export default function SurveyListItem({ job, onDeleteClick }) {

  
  return (
    <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
        <img 
            src={job.image_url}
            alt={job.title}
            className="w-full h-48 object-cover"
        />
        <h4 className="mt-4 text-lg font-bold">{job.title}</h4>
        <div dangerouslySetInnerHTML={{ __html: job.description }} className="overflow-hidden flex-1"></div>
                <div className="flex justify-between items-center mt-3">
                    <TButton to={`jobs/${job.id}`}>
                        <PencilIcon className="w-5 h-5 mr-2">
                           
                        </PencilIcon>
                        Edit
                    </TButton>
                    <div className="flex items-center">
                        <TButton to={`/view/job/${job.id}`} circle link>
                            <ArrowTopRightOnSquareIcon className="w-5 h-5" />                      
                        </TButton>

                        {job.id && (
                            <TButton onClick={onDeleteClick} color="red" circle link>
                                <TrashIcon className="w-5 h-5" />                      
                            </TButton>
                        )}
                    </div>
                </div> 
    </div>
  )
}


