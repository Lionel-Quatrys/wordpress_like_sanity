import React, { useEffect, useState } from "react";
import { definePlugin, useClient } from "sanity";
import { moduleCache } from "../moduleCache";

function ModuleVisibilityProvider(props: {
  renderDefault: (props: any) => React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);
  const client = useClient({ apiVersion: "2024-01-01" });

  useEffect(() => {
    // Chargement initial
    client
      .fetch(`*[_id == "moduleSettings"][0]`)
      .then((settings: any) => {
        if (settings) moduleCache.settings = settings;
      })
      .catch(() => {})
      .finally(() => {
        moduleCache.loaded = true;
        setLoaded(true);
      });

    // Rechargement automatique quand l'admin modifie les modules
    const subscription = client
      .listen(`*[_id == "moduleSettings"]`, {}, { visibility: "query" })
      .subscribe(() => {
        window.location.reload();
      });

    return () => subscription.unsubscribe();
  }, [client]);

  if (!loaded) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontFamily: "sans-serif",
          color: "#888",
        }}
      >
        Chargement du studio…
      </div>
    );
  }

  return <>{props.renderDefault(props)}</>;
}

export const moduleVisibilityPlugin = definePlugin({
  name: "module-visibility",
  studio: {
    components: {
      layout: ModuleVisibilityProvider,
    },
  },
});
