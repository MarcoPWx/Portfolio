import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ComprehensiveSkills } from '../../src/components/ComprehensiveSkills';

describe('ComprehensiveSkills', () => {
  beforeEach(() => {
    render(<ComprehensiveSkills />);
  });

  test('renders the skills component', () => {
    expect(screen.getByText('Technology Stack & Expertise')).toBeInTheDocument();
    expect(screen.getByText('Programming Languages')).toBeInTheDocument();
    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
    expect(screen.getByText('Backend Development')).toBeInTheDocument();
    expect(screen.getByText('AI & Machine Learning')).toBeInTheDocument();
    expect(screen.getByText('Cloud & DevOps')).toBeInTheDocument();
  });

  test('displays technology categories', () => {
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('TensorFlow & PyTorch')).toBeInTheDocument();
    expect(screen.getByText('AWS')).toBeInTheDocument();
  });

  test('expands technology cards when clicked', async () => {
    const typescriptCard = screen.getByText('TypeScript');
    fireEvent.click(typescriptCard);

    await waitFor(() => {
      expect(screen.getByText('DevMentor AI Assistant')).toBeInTheDocument();
    });
  });

  test('shows project examples when technology is expanded', async () => {
    const pythonCard = screen.getByText('Python');
    fireEvent.click(pythonCard);

    await waitFor(() => {
      expect(screen.getByText('Harvest.ai Content Intelligence')).toBeInTheDocument();
    });
  });

  test('displays AI/ML technologies', () => {
    expect(screen.getByText('OpenAI API')).toBeInTheDocument();
    expect(screen.getByText('TensorFlow & PyTorch')).toBeInTheDocument();
    expect(screen.getByText('LangChain')).toBeInTheDocument();
    expect(screen.getByText('Vector Databases')).toBeInTheDocument();
  });

  test('shows AI project examples', async () => {
    const openaiCard = screen.getByText('OpenAI API');
    fireEvent.click(openaiCard);

    await waitFor(() => {
      expect(screen.getByText('DevMentor AI Assistant')).toBeInTheDocument();
    });
  });

  test('displays cloud and DevOps technologies', () => {
    expect(screen.getByText('AWS')).toBeInTheDocument();
    expect(screen.getByText('Docker & Kubernetes')).toBeInTheDocument();
    expect(screen.getByText('CI/CD')).toBeInTheDocument();
  });

  test('shows infrastructure project examples', async () => {
    const awsCard = screen.getByText('AWS');
    fireEvent.click(awsCard);

    await waitFor(() => {
      expect(screen.getByText('NatureQuest Production Infrastructure')).toBeInTheDocument();
    });
  });

  test('displays frontend technologies', () => {
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('React Native')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
  });

  test('shows frontend project examples', async () => {
    const reactCard = screen.getByText('React');
    fireEvent.click(reactCard);

    await waitFor(() => {
      expect(screen.getByText('QuizMentor Web Platform')).toBeInTheDocument();
    });
  });

  test('displays backend technologies', () => {
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('FastAPI')).toBeInTheDocument();
    expect(screen.getByText('GraphQL')).toBeInTheDocument();
  });

  test('displays experience levels', () => {
    expect(screen.getAllByText('6+ years').length).toBeGreaterThan(0);
    expect(screen.getAllByText('7+ years').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Expert').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Advanced').length).toBeGreaterThan(0);
  });

  test('renders component container', () => {
    expect(screen.getByTestId('comprehensive-skills')).toBeInTheDocument();
  });

  test('handles technology card interactions', async () => {
    // Test clicking on a technology card
    const typescriptCard = screen.getByText('TypeScript');
    fireEvent.click(typescriptCard);

    await waitFor(() => {
      expect(screen.getByText('DevMentor AI Assistant')).toBeInTheDocument();
    });
  });

  test('shows years of experience', () => {
    expect(screen.getAllByText('5+ years').length).toBeGreaterThan(0);
    expect(screen.getAllByText('6+ years').length).toBeGreaterThan(0);
    expect(screen.getAllByText('7+ years').length).toBeGreaterThan(0);
  });
});
