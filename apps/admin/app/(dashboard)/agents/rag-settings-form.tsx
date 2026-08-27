'use client';

import { FormEvent, useState } from 'react';

const MODELS = [
  { value: 'openai-ada-2', label: 'OpenAI Ada 2' },
  { value: 'hf-bert', label: 'Hugging Face BERT' },
  { value: 'custom', label: 'Custom Model' },
] as const;

type ModelValue = (typeof MODELS)[number]['value'];

function validateKnowledgePath(path: string): string | null {
  const trimmed = path.trim();
  if (!trimmed) {
    return 'Knowledge base path is required.';
  }
  if (!trimmed.startsWith('/')) {
    return 'Path must be absolute.';
  }
  if (trimmed.includes('..')) {
    return 'Path must not contain parent segments.';
  }
  if (!/^\/[A-Za-z0-9._/-]+$/.test(trimmed)) {
    return 'Path contains invalid characters.';
  }
  return null;
}

function validateModel(value: string): value is ModelValue {
  return MODELS.some((model) => model.value === value);
}

export function RagSettingsForm() {
  const [path, setPath] = useState('/data/knowledge');
  const [model, setModel] = useState<ModelValue>('openai-ada-2');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    const pathError = validateKnowledgePath(path);
    if (pathError) {
      setError(pathError);
      return;
    }
    if (!validateModel(model)) {
      setError('Embedding model is not allowed.');
      return;
    }
    setError(null);
    setMessage('Settings are valid. No remote save is configured.');
  }

  return (
    <form className="mt-4 space-y-4" onSubmit={onSubmit} noValidate>
      {error ? (
        <p className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-800">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="rounded border p-3 text-sm">{message}</p>
      ) : null}
      <div>
        <label className="block text-sm font-medium" htmlFor="knowledge-path">
          Knowledge Base Path
        </label>
        <input
          id="knowledge-path"
          type="text"
          name="knowledgePath"
          required
          value={path}
          onChange={(event) => setPath(event.target.value)}
          className="mt-1 w-full rounded border p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="embedding-model">
          Embedding Model
        </label>
        <select
          id="embedding-model"
          name="embeddingModel"
          required
          value={model}
          onChange={(event) => setModel(event.target.value as ModelValue)}
          className="mt-1 w-full rounded border p-2"
        >
          {MODELS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="rounded bg-primary px-4 py-2 text-primary-foreground"
      >
        Update RAG Settings
      </button>
    </form>
  );
}
