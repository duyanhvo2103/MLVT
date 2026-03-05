

const LanguageSelector = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">Language:</span>
      <select className="border border-gray-300 rounded p-1 text-sm">
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="csharp">C#</option>
      </select>
    </div>
  );
}
export default LanguageSelector;