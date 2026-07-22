import { getProjectById } from '@/lib/api';
import ProjectForm from '@/components/ProjectForm';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex-1 bg-[#F7F7F7] overflow-y-auto h-full">
      <div className="max-w-[780px] mx-auto w-full">
        <ProjectForm initialData={project} />
      </div>
    </div>
  );
}
