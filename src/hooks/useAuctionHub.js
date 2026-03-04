import { useState, useEffect, useRef, useCallback } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

export function useAuctionHub(auctionId) {
    const [connection, setConnection] = useState(null);
    const [liveBid, setLiveBid] = useState(null);
    const [auctionClosed, setAuctionClosed] = useState(false);
    const connRef = useRef(null);

    useEffect(() => {
        if (!auctionId) return;

        const conn = new HubConnectionBuilder()
            .withUrl('http://localhost:5164/auctionHub')
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Warning)
            .build();

        conn.on('ReceiveBidUpdate', (data) => {
            setLiveBid(data);
        });

        conn.on('AuctionClosed', (data) => {
            setAuctionClosed(true);
        });

        conn.start()
            .then(() => {
                conn.invoke('JoinAuctionGroup', String(auctionId));
                connRef.current = conn;
                setConnection(conn);
            })
            .catch(console.error);

        return () => {
            if (connRef.current) {
                connRef.current.invoke('LeaveAuctionGroup', String(auctionId)).catch(() => { });
                connRef.current.stop();
            }
        };
    }, [auctionId]);

    return { connection, liveBid, auctionClosed };
}
