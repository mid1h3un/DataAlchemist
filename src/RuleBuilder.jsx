import React, { useState } from 'react';

function RuleBuilder({ onExport }) {
  const [ruleType, setRuleType] = useState('');
  const [formState, setFormState] = useState({});
  const [rules, setRules] = useState([]);

  const handleAddRule = () => {
    const newRule = buildRule(ruleType, formState);
    if (newRule) {
      setRules([...rules, newRule]);
      setFormState({});
    }
  };

  const buildRule = (type, data) => {
    switch (type) {
      case 'coRun':
        return { type, tasks: data.tasks.split(',').map(t => t.trim()) };
      case 'slotRestriction':
        return { type, group: data.group, minSlots: parseInt(data.minSlots) };
      case 'loadLimit':
        return { type, group: data.group, maxSlots: parseInt(data.maxSlots) };
      case 'phaseWindow':
        return { type, task: data.task, phases: data.phases.split(',').map(p => parseInt(p)) };
      case 'patternMatch':
        return { type, pattern: data.pattern, template: data.template, params: data.params };
      default:
        return null;
    }
  };

const handleExportToBackend = async () => {
  try {
    const res = await fetch('http://localhost:5000/save-rules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rules }),
    });

    const json = await res.json();
    alert(`✅ Rules saved: ${json.message}`);
  } catch (err) {
    alert('❌ Failed to save rules');
    console.error(err);
  }
};

  const renderInputs = () => {
    switch (ruleType) {
      case 'coRun':
        return (
          <input
            placeholder="Task IDs (comma-separated)"
            value={formState.tasks || ''}
            onChange={(e) => setFormState({ ...formState, tasks: e.target.value })}
          />
        );
      case 'slotRestriction':
        return (
          <>
            <input placeholder="Group" value={formState.group || ''} onChange={(e) => setFormState({ ...formState, group: e.target.value })} />
            <input type="number" placeholder="Min Common Slots" value={formState.minSlots || ''} onChange={(e) => setFormState({ ...formState, minSlots: e.target.value })} />
          </>
        );
      case 'loadLimit':
        return (
          <>
            <input placeholder="Worker Group" value={formState.group || ''} onChange={(e) => setFormState({ ...formState, group: e.target.value })} />
            <input type="number" placeholder="Max Slots per Phase" value={formState.maxSlots || ''} onChange={(e) => setFormState({ ...formState, maxSlots: e.target.value })} />
          </>
        );
      case 'phaseWindow':
        return (
          <>
            <input placeholder="Task ID" value={formState.task || ''} onChange={(e) => setFormState({ ...formState, task: e.target.value })} />
            <input placeholder="Phases (comma-separated)" value={formState.phases || ''} onChange={(e) => setFormState({ ...formState, phases: e.target.value })} />
          </>
        );
      case 'patternMatch':
        return (
          <>
            <input placeholder="Regex Pattern" value={formState.pattern || ''} onChange={(e) => setFormState({ ...formState, pattern: e.target.value })} />
            <input placeholder="Template" value={formState.template || ''} onChange={(e) => setFormState({ ...formState, template: e.target.value })} />
            <input placeholder="Params (free-form)" value={formState.params || ''} onChange={(e) => setFormState({ ...formState, params: e.target.value })} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="section">
      <h3>🛠️ Rule Builder</h3>
      <select value={ruleType} onChange={(e) => setRuleType(e.target.value)}>
        <option value="">Select Rule Type</option>
        <option value="coRun">Co-run</option>
        <option value="slotRestriction">Slot Restriction</option>
        <option value="loadLimit">Load Limit</option>
        <option value="phaseWindow">Phase Window</option>
        <option value="patternMatch">Pattern Match</option>
      </select>

      <div style={{ marginTop: '1rem' }}>{renderInputs()}</div>

      <button onClick={handleAddRule} style={{ marginTop: '1rem' }}>➕ Add Rule</button>

      {rules.length > 0 && (
        <>
          <h4>📋 Current Rules</h4>
          <pre>{JSON.stringify(rules, null, 2)}</pre>
          <button onClick={handleExportToBackend}>📡 Send Rules to Backend</button>
        </>
      )}
    </div>
  );
}

export default RuleBuilder;
