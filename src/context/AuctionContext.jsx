/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { inventoryData as initialInventory } from "../data/inventoryData";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const ADVERTISERS = ["TechNova", "Globex", "Initech", "Umbrella Corp", "Acme Corp", "Stark Ind", "Wayne Ent"];
const AUDIENCES = ["18-24 Tech", "25-34 Finance", "35-44 Parents", "All Ages", "B2B Software", "Gamers"];

const INITIAL_ADJACENCY_LIST = {
  AdServer: ["TechNews", "SportsWorld", "GameZone", "FashionHub"],
  TechNews: ["AdServer", "AppleCampaign"],
  SportsWorld: ["AdServer", "NikeCampaign"],
  GameZone: ["AdServer", "GamingCampaign"],
  FashionHub: ["AdServer"],
  NikeCampaign: ["SportsWorld"],
  AppleCampaign: ["TechNews"],
  GamingCampaign: ["GameZone"]
};

const AuctionContext = createContext();

export const useAuction = () => useContext(AuctionContext);

export const AuctionProvider = ({ children }) => {
  // Data version — bump this whenever the localStorage schema changes
  const DATA_VERSION = "3";
  if (typeof window !== "undefined") {
    const storedVersion = window.localStorage.getItem("ad_platform_version");
    if (storedVersion !== DATA_VERSION) {
      // Clear all stale data on schema change
      Object.keys(window.localStorage).forEach(key => {
        if (key.startsWith("ad_platform_")) window.localStorage.removeItem(key);
      });
      window.localStorage.setItem("ad_platform_version", DATA_VERSION);
    }
  }

  const [inventory, setInventory] = useLocalStorage("ad_platform_inventory", initialInventory);
  const [queue, setQueue] = useLocalStorage("ad_platform_queue", []);
  const [processed, setProcessed] = useLocalStorage("ad_platform_processed", []);
  const [totalRequests, setTotalRequests] = useLocalStorage("ad_platform_totalRequests", 0);
  const [adjacencyList, setAdjacencyList] = useLocalStorage("ad_platform_adjacencyList", INITIAL_ADJACENCY_LIST);

  // Global Cache Servers State
  const [servers, setServers] = useLocalStorage("ad_platform_servers", () => {
    const initialServers = [
      { id: 0, name: "Server A", storage: 0, ads: [], color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", fill: "bg-blue-500" },
      { id: 1, name: "Server B", storage: 0, ads: [], color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200", fill: "bg-purple-500" },
      { id: 2, name: "Server C", storage: 0, ads: [], color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", fill: "bg-emerald-500" }
    ];
    
    // Initialize with real platform data
    const initialAds = ADVERTISERS.slice(0, 5); // Pre-load with the first 5 real advertisers
    
    initialAds.forEach(ad => {
      let hash = 0;
      for (let i = 0; i < ad.length; i++) hash += ad.charCodeAt(i);
      const serverIndex = hash % initialServers.length;
      initialServers[serverIndex].ads.push(ad);
      initialServers[serverIndex].storage = Math.min(100, initialServers[serverIndex].storage + 2);
    });
    
    return initialServers;
  });

  const storeInCache = (adName) => {
    let hash = 0;
    for (let i = 0; i < adName.length; i++) hash += adName.charCodeAt(i);
    const serverIndex = hash % servers.length;

    setServers(prev => {
      const newServers = [...prev];
      const targetServer = { ...newServers[serverIndex] };
      // Prevent duplicates
      if (!targetServer.ads.includes(adName)) {
        targetServer.ads = [...targetServer.ads, adName];
        targetServer.storage = Math.min(100, targetServer.storage + 2);
      }
      newServers[serverIndex] = targetServer;
      return newServers;
    });
    return { hash, serverIndex };
  };

  const deleteFromCache = (adName) => {
    let hash = 0;
    for (let i = 0; i < adName.length; i++) hash += adName.charCodeAt(i);
    const serverIndex = hash % servers.length;
    let found = false;

    setServers(prev => {
      const newServers = [...prev];
      const targetServer = { ...newServers[serverIndex] };
      const adIndex = targetServer.ads.indexOf(adName);
      if (adIndex > -1) {
        found = true;
        targetServer.ads = targetServer.ads.filter((_, i) => i !== adIndex);
        targetServer.storage = Math.max(0, targetServer.storage - 2);
      }
      newServers[serverIndex] = targetServer;
      return newServers;
    });
    return { hash, serverIndex, found };
  };

  const removeServer = (serverId) => {
    setServers(prev => {
      if (prev.length <= 1) return prev; // Cannot remove last server
      
      const targetServer = prev.find(s => s.id === serverId);
      if (!targetServer) return prev;

      const allAds = new Set();
      prev.forEach(s => s.ads.forEach(ad => allAds.add(ad)));

      const remainingServers = prev.filter(s => s.id !== serverId);
      const newServers = remainingServers.map(s => ({ ...s, ads: [], storage: 0 }));

      Array.from(allAds).forEach(ad => {
        let hash = 0;
        for (let i = 0; i < ad.length; i++) hash += ad.charCodeAt(i);
        const serverIndex = hash % newServers.length;
        newServers[serverIndex].ads.push(ad);
        newServers[serverIndex].storage = Math.min(100, newServers[serverIndex].storage + 2);
      });

      return newServers;
    });
  };

  const addServer = () => {
    setServers(prev => {
      const allAds = new Set();
      prev.forEach(s => s.ads.forEach(ad => allAds.add(ad)));

      const newId = prev.length > 0 ? Math.max(...prev.map(s => s.id)) + 1 : 0;
      const colors = [
        { color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", fill: "bg-blue-500" },
        { color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200", fill: "bg-purple-500" },
        { color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", fill: "bg-emerald-500" },
        { color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", fill: "bg-amber-500" },
        { color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200", fill: "bg-rose-500" },
        { color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200", fill: "bg-indigo-500" }
      ];
      const style = colors[newId % colors.length];

      const newServer = {
        id: newId,
        name: `Server ${String.fromCharCode(65 + newId)}`,
        storage: 0,
        ads: [],
        ...style
      };

      const newServers = [...prev.map(s => ({ ...s, ads: [], storage: 0 })), newServer];

      Array.from(allAds).forEach(ad => {
        let hash = 0;
        for (let i = 0; i < ad.length; i++) hash += ad.charCodeAt(i);
        const serverIndex = hash % newServers.length;
        newServers[serverIndex].ads.push(ad);
        newServers[serverIndex].storage = Math.min(100, newServers[serverIndex].storage + 2);
      });

      return newServers;
    });
  };

  // Global Budget State
  const [budgetHistory, setBudgetHistory] = useLocalStorage("ad_platform_budgetHistory", [
    { id: '1', amount: 75000, timestamp: '2026-06-13T00:00:00.000Z', type: 'INITIAL', diff: null },
    { id: '2', amount: 165000, timestamp: '2026-06-13T04:00:00.000Z', type: 'UPDATE', diff: 90000 },
    { id: '3', amount: 85000, timestamp: '2026-06-13T10:00:00.000Z', type: 'UPDATE', diff: -80000 },
    { id: '4', amount: 185000, timestamp: '2026-06-13T14:00:00.000Z', type: 'UPDATE', diff: 100000 },
    { id: '5', amount: 310000, timestamp: '2026-06-13T21:00:00.000Z', type: 'UPDATE', diff: 125000 }
  ]);
  const currentBudget = budgetHistory.length > 0 ? budgetHistory[budgetHistory.length - 1].amount : 0;

  const pushBudgetUpdate = (diffAmount, type = 'UPDATE') => {
    setBudgetHistory(prev => {
      const current = prev.length > 0 ? prev[prev.length - 1].amount : 0;
      const newTotal = current + diffAmount;
      const newEntry = {
        id: Date.now().toString(),
        diff: diffAmount,
        amount: newTotal,
        type: type,
        timestamp: new Date().toISOString()
      };
      return [...prev, newEntry];
    });
  };

  const popBudgetUpdate = () => {
    setBudgetHistory(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  // Generates a random bid for a specific slot, or totally random if not provided
  const generateBid = (slotId = null, websiteId = null, slotName = null) => {
    const ad = ADVERTISERS[Math.floor(Math.random() * ADVERTISERS.length)];
    const aud = AUDIENCES[Math.floor(Math.random() * AUDIENCES.length)];
    // IRL Corporate Campaign Budgets: ₹1,25,000 to ₹20,75,000
    const rawAmount = Math.random() * (2075000 - 125000) + 125000;
    // Format with Indian locale
    const bidAmount = new Intl.NumberFormat('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(rawAmount));
    
    return {
      id: `bid-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      advertiser: ad,
      amount: bidAmount,
      rawAmount: rawAmount,
      audience: aud,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      status: 'Pending',
      slotId,
      websiteId,
      slotName
    };
  };

  const startAuction = (slotId, websiteId, slotName) => {
    const newBid = generateBid(slotId, websiteId, slotName);
    setQueue(prev => [...prev, newBid]);
    setTotalRequests(prev => prev + 1);
  };

  const addRandomBid = () => {
    const newBid = generateBid();
    setQueue(prev => [...prev, newBid]);
    setTotalRequests(prev => prev + 1);
  };

  const processNextBid = () => {
    if (queue.length === 0) return;
    const [frontItem, ...restQueue] = queue;
    
    setQueue(restQueue);
    
    // Add to processed history
    setProcessed(prev => [
      { ...frontItem, status: 'Processed', processTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) },
      ...prev
    ]);

    // If this bid was for a specific slot, update the inventory!
    if (frontItem.slotId && frontItem.websiteId) {
      const bidAmountInINR = Math.round(frontItem.rawAmount);
      
      // Deduct from budget
      pushBudgetUpdate(-bidAmountInINR, 'AUCTION_WIN');

      // Store advertiser in cache
      storeInCache(frontItem.advertiser);

      setInventory(prevInventory => 
        prevInventory.map(website => {
          if (website.id === frontItem.websiteId) {
            return {
              ...website,
              slots: website.slots.map(slot => {
                if (slot.id === frontItem.slotId) {
                  return {
                    ...slot,
                    status: "Sold",
                    advertiser: {
                      name: frontItem.advertiser,
                      budget: `₹${new Intl.NumberFormat('en-IN').format(currentBudget - bidAmountInINR)}`,
                      dailySpend: "₹10,000",
                      // Using a rough INR conversion 1 USD = 83 INR
                      bidAmount: `₹${new Intl.NumberFormat('en-IN').format(bidAmountInINR)}`
                    }
                  };
                }
                return slot;
              })
            };
          }
          return website;
        })
      );
    }
  };

  const deleteBid = (id) => {
    setQueue(prev => prev.filter(bid => bid.id !== id));
  };

  const removeSlot = (websiteId, slotId) => {
    setInventory(prevInventory => 
      prevInventory.map(website => {
        if (website.id === websiteId) {
          return {
            ...website,
            slots: website.slots.filter(slot => slot.id !== slotId)
          };
        }
        return website;
      })
    );
  };

  const resetData = () => {
    if (typeof window !== "undefined") {
      window.localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <AuctionContext.Provider value={{
      inventory,
      queue,
      processed,
      totalRequests,
      adjacencyList,
      setAdjacencyList,
      startAuction,
      addRandomBid,
      processNextBid,
      deleteBid,
      removeSlot,
      budgetHistory,
      currentBudget,
      pushBudgetUpdate,
      popBudgetUpdate,
      servers,
      storeInCache,
      deleteFromCache,
      addServer,
      removeServer,
      resetData
    }}>
      {children}
    </AuctionContext.Provider>
  );
};
