import { useEffect, useRef, useState } from 'react';
import { Boxes, ChevronDown, ChevronUp, Pause, Play, RotateCcw } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { getPortfolioData } from '../data/portfolio';
import { gsap } from '../lib/gsapSetup';
import { TechIcon } from './TechIcon';
import {
  createArchitectureScene,
  getArchitectureNodes,
  type ArchitectureNodeId,
  type ArchitectureSceneController,
  type CameraPresetId,
} from './three/architectureScene';

export function Architecture3DSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<ArchitectureSceneController | null>(null);
  const { theme, lang } = usePreferences();
  const data = getPortfolioData(lang).arch3d;
  const nodes = getArchitectureNodes(lang);

  const [selectedId, setSelectedId] = useState<ArchitectureNodeId>('api-gateway');
  const [hoveredId, setHoveredId] = useState<ArchitectureNodeId | null>(null);
  const [explode, setExplode] = useState(0);
  const [activePreset, setActivePreset] = useState<CameraPresetId>('global');
  const [flowRunning, setFlowRunning] = useState(true);
  const [dockExpanded, setDockExpanded] = useState(true);
  const [webglFallback, setWebglFallback] = useState(false);

  const selectedNode = nodes.find((n) => n.id === selectedId) ?? nodes[0];
  const hoveredNode = hoveredId
    ? nodes.find((n) => n.id === hoveredId) ?? null
    : null;

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (!sectionRef.current) return;
      gsap.from('.arch3d-reveal', {
        y: 26,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 84%',
          once: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    const mountEl = canvasMountRef.current;
    if (!mountEl) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setFlowRunning(false);
    }

    let controller: ArchitectureSceneController | null = null;
    try {
      controller = createArchitectureScene(mountEl, {
        initialTheme: theme,
        onSelectNode: (id) => {
          setSelectedId(id);
        },
        onHoverNode: (id) => {
          setHoveredId(id);
        },
        onContextLost: () => setWebglFallback(true),
        onContextRestored: () => setWebglFallback(false),
      });
      if (prefersReduced) {
        controller.setFlowRunning(false);
      }
      controllerRef.current = controller;
    } catch {
      setWebglFallback(true);
    }

    return () => {
      controller?.dispose();
      controllerRef.current = null;
    };
    // Initialize WebGL canvas once and sync theme separately without tearing down scene
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    controllerRef.current?.setTheme(theme);
  }, [theme]);

  const handleSelectNode = (id: ArchitectureNodeId) => {
    setSelectedId(id);
    controllerRef.current?.setSelectedNode(id);
  };

  const handleExplodeChange = (value: number) => {
    setExplode(value);
    controllerRef.current?.setExplodeFactor(value);
  };

  const handlePreset = (preset: CameraPresetId) => {
    setActivePreset(preset);
    controllerRef.current?.setCameraPreset(preset);
  };

  const handleToggleFlow = () => {
    const next = !flowRunning;
    setFlowRunning(next);
    controllerRef.current?.setFlowRunning(next);
  };

  const handleReset = () => {
    setExplode(0);
    setActivePreset('global');
    setSelectedId('api-gateway');
    setFlowRunning(true);
    controllerRef.current?.setExplodeFactor(0);
    controllerRef.current?.setCameraPreset('global');
    controllerRef.current?.setSelectedNode('api-gateway');
    controllerRef.current?.setFlowRunning(true);
  };

  return (
    <section
      ref={sectionRef}
      id="architecture-3d"
      className="border-b border-zinc-200/80 py-20 dark:border-zinc-800/80 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="arch3d-reveal flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-blue-600 dark:text-blue-400">
              {data.kicker}
            </p>
            <h2 className="font-display mt-2 text-balance text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
              {data.title}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              {data.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <span>{data.hint}</span>
          </div>
        </div>

        {/* Unobstructed 3D Viewport Container with Collapsible Bottom Dock */}
        <div className="arch3d-reveal relative mt-8 h-[580px] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-[#e5ebf3] dark:border-zinc-800/90 dark:bg-[#050507] sm:h-[640px]">
          {/* Isolated WebGL Mount (never blurred over) */}
          <div
            ref={canvasMountRef}
            className="h-full w-full"
            aria-label={data.fallbackAria}
          />

          {/* Graceful Fallback if WebGL unavailable */}
          {webglFallback && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-100 p-8 text-center dark:bg-[#070709]">
              <Boxes className="h-10 w-10 text-blue-600 dark:text-blue-500" aria-hidden="true" />
              <h3 className="font-display mt-4 text-xl font-semibold text-zinc-950 dark:text-white">
                {selectedNode.title}
              </h3>
              <p className="mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
                {selectedNode.description}
              </p>
            </div>
          )}

          {/* Top-Left Minimal Readout (solid surface, zero backdrop-blur over WebGL) */}
          <div className="pointer-events-none absolute top-4 left-4 z-10 max-w-xs rounded-xl border border-zinc-200/90 bg-white/95 px-4 py-3 shadow-sm dark:border-zinc-800/90 dark:bg-[#0B0B0E]/95 sm:max-w-sm">
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-mono tabular-nums text-blue-600 dark:text-blue-400">
                {(hoveredNode ?? selectedNode).index}
              </span>
              <span aria-hidden="true">·</span>
              <span>{hoveredNode ? data.hoverLabel : data.selectedLabel}</span>
            </div>
            <p className="font-display mt-1 text-base font-semibold text-zinc-950 dark:text-white">
              {(hoveredNode ?? selectedNode).title}
            </p>
            <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
              {(hoveredNode ?? selectedNode).subtitle}
            </p>
          </div>

          {/* Collapsible Bottom Control Dock (Zero Center Occlusion) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex flex-col items-center px-3 sm:px-4">
            <button
              type="button"
              onClick={() => setDockExpanded((prev) => !prev)}
              className="pointer-events-auto inline-flex items-center gap-1.5 rounded-t-xl border border-b-0 border-zinc-200/90 bg-white/95 px-4 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:text-zinc-950 dark:border-zinc-800/90 dark:bg-[#0B0B0E]/95 dark:text-zinc-300 dark:hover:text-white"
            >
              {dockExpanded ? (
                <>
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{data.hideControls}</span>
                </>
              ) : (
                <>
                  <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{data.showControls}</span>
                </>
              )}
            </button>

            {dockExpanded && (
              <div className="pointer-events-auto w-full max-w-[920px] rounded-2xl border border-zinc-200/90 bg-white/95 p-4 shadow-xl dark:border-zinc-800/90 dark:bg-[#0B0B0E]/95 dark:shadow-2xl">
                {/* Node Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 border-b border-zinc-200 pb-3 dark:border-zinc-800/80">
                  {nodes.map((node) => {
                    const isActive = node.id === selectedId;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => handleSelectNode(node.id)}
                        className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-950 dark:bg-zinc-900/90 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                        }`}
                      >
                        <span className="font-mono text-[11px] tabular-nums opacity-75">
                          {node.index}
                        </span>
                        <span>{node.title}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Node Summary + Stack Icons */}
                <div className="mt-3 flex flex-col justify-between gap-3 border-b border-zinc-200 pb-3 dark:border-zinc-800/80 md:flex-row md:items-center">
                  <p className="max-w-xl text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {selectedNode.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5">
                    {selectedNode.stack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 text-xs text-zinc-800 dark:text-zinc-200"
                      >
                        <TechIcon name={tech} className="h-3.5 w-3.5 shrink-0" />
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Controls: Exploded View + Camera Presets + Flow */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                  <label className="flex items-center gap-3 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    <span className="whitespace-nowrap">{data.explodedView}</span>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={Math.round(explode * 100)}
                      onChange={(e) => handleExplodeChange(Number(e.target.value) / 100)}
                      aria-label={data.explodedView}
                      className="h-1.5 w-28 cursor-pointer accent-blue-600 sm:w-36"
                    />
                    <span className="w-9 font-mono text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
                      {Math.round(explode * 100)}%
                    </span>
                  </label>

                  <div className="flex flex-wrap items-center gap-2">
                    {data.presets.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handlePreset(preset.id)}
                        className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          activePreset === preset.id
                            ? 'border border-blue-500/60 bg-blue-600/10 text-blue-700 dark:bg-blue-600/20 dark:text-blue-300'
                            : 'border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={handleToggleFlow}
                      aria-label={flowRunning ? data.pause : data.play}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white whitespace-nowrap shrink-0"
                    >
                      {flowRunning ? (
                        <>
                          <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{data.pause}</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{data.play}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      aria-label={data.reset}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white whitespace-nowrap shrink-0"
                    >
                      <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{data.reset}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
