import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '../lib/queryClient';

// Hook for fetching all portfolio data
export function usePortfolioData() {
  // Fetch projects data
  const projectsQuery = useQuery({
    queryKey: ['/api/projects'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Fetch experiences data
  const experiencesQuery = useQuery({
    queryKey: ['/api/experiences'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Fetch skills data
  const skillsQuery = useQuery({
    queryKey: ['/api/skills'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Determine if any queries are loading
  const isLoading = projectsQuery.isLoading || experiencesQuery.isLoading || skillsQuery.isLoading;
  
  // Determine if any queries have errored
  const isError = projectsQuery.isError || experiencesQuery.isError || skillsQuery.isError;
  
  // Combine any error messages
  const errorMessage = [
    projectsQuery.error?.message,
    experiencesQuery.error?.message,
    skillsQuery.error?.message,
  ].filter(Boolean).join(', ');

  return {
    projects: projectsQuery.data || [],
    experiences: experiencesQuery.data || [],
    skills: skillsQuery.data || [],
    isLoading,
    isError,
    errorMessage,
    refetch: () => {
      projectsQuery.refetch();
      experiencesQuery.refetch();
      skillsQuery.refetch();
    }
  };
}

// Hook for submitting contact form data
export function useContactForm() {
  const contactMutation = useMutation({
    mutationFn: (data) => apiRequest('POST', '/api/contact', data)
      .then(res => res.json()),
  });

  return {
    submitContact: contactMutation.mutate,
    isSubmitting: contactMutation.isPending,
    isSuccess: contactMutation.isSuccess,
    isError: contactMutation.isError,
    error: contactMutation.error?.message,
    reset: contactMutation.reset,
  };
}