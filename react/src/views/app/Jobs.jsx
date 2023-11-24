import AppPage from "../../components/pages/app/AppPage"
import { useStateContext } from "../../contexts/ContextProvider";
import JobListItem from "../../components/common/JobListItem";
import TButton from "../../components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/20/solid";


export default function Jobs() {

  const { jobs } = useStateContext();

  const onDeleteClick = () => {
    console.log('clicked delete');
  }

  return (

    <AppPage title="Jobs" buttons={ (
      <TButton color="green" to="/app/jobs/create">
          <PlusCircleIcon className="h-5 w-5 mr-2" aria-hidden="true" />
          Create new
      </TButton>  
  ) }>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols1 md:grid-cols-1">
            {jobs.map((job) => (
                <JobListItem key={job.id} job={job} onDeleteClick={onDeleteClick} />
            ))}
        </div>
    </AppPage>

  )
}
